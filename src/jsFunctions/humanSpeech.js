export const verifyHumanSpeech = async (word) => {
   const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

   try {
      const result = await fetch(url).then((res) => res.json())
      // console.log('result: ', result)
      const pronunciation =
         result[0]?.phonetics[0]?.audio ||
         result[0]?.phonetics[1]?.audio ||
         result[0]?.phonetics[2]?.audio ||
         result[0]?.phonetics[3]?.audio

      // console.log('API (SPEECH) RETURNED: ', pronunciation)

      // testAudioFile2(pronunciation)

      let synonyms =
         result[0]?.meanings[0]?.synonyms?.length > 0
            ? result[0]?.meanings[0]?.synonyms
            : result[0]?.meanings[1]?.synonyms || []

      // console.log('API SYNONYMS RETURNED: ', synonyms)

      synonyms = synonyms.join(', ')

      // console.log(
      //    'ORIGINAL SYNONYMS: ',
      //    synonyms.length,
      //    synonyms
      // )

      if (synonyms.length < 3) {
         synonyms = '❌'
      }

      // console.log('UPDATED SYNONYMS: ', synonyms)

      if (pronunciation) {
         // const audio = new Audio(pronunciation)
         // console.log('audio: ', audio)
         // audio.play()
         return {
            audioLink: pronunciation,
            hasHumanVoice: true,
            synonyms: synonyms,
         }
      } else {
         return { hasHumanVoice: false, synonyms }
      }
   } catch (error) {
      let synonyms = '❌'
      return { hasHumanVoice: false, synonyms }
   }
}

// Create an in-memory cache to store words and their pronunciations
// Create an in-memory cache to store words and their pronunciations
const cache = new Map()

export const getHumanSpeech = async (word) => {
   // First, check if the word is already in the cache
   if (cache.has(word)) {
      // If it is, retrieve the pronunciation from the cache
      const pronunciation = cache.get(word)
      return { icon: '✓', blob: pronunciation }
   }

   // If the word is not in the cache, fetch it from the API
   const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
   const result = await fetch(url).then((res) => res.json())

   const audioUrl =
      result[0]?.phonetics[0]?.audio ||
      result[0]?.phonetics[1]?.audio ||
      result[0]?.phonetics[2]?.audio ||
      result[0]?.phonetics[3]?.audio

   if (audioUrl) {
      // Fetch the audio file as a blob
      const audioBlob = await fetch(audioUrl).then((res) =>
         res.blob()
      )

      // Store the audio blob in the cache
      cache.set(word, audioBlob)

      return { icon: '✓', blob: audioBlob }
   } else {
      return { icon: '✗', blob: null }
   }
}

// export const playHumanSpeech = async (word) => {
//    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

//    try {
//       const result = await fetch(url).then((res) => res.json())
//       const pronunciation =
//          result[0]?.phonetics[0]?.audio ||
//          result[0]?.phonetics[1]?.audio ||
//          result[0]?.phonetics[2]?.audio ||
//          result[0]?.phonetics[3]?.audio

//       if (pronunciation) {
//          const icon = '👩‍🦲'
//          const audio = new Audio(pronunciation)
//          console.log('audio: ', audio)
//          audio.play()
//          return { hasHumanVoice: true, icon }
//       } else {
//          const icon = '❌'
//          return { hasHumanVoice: false, icon }
//       }
//    } catch (error) {
//       const icon = '❌'
//       return { hasHumanVoice: false, icon }
//    }
// }

export const playHumanSpeech = async (word) => {
   const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

   try {
      const result = await fetch(url).then((res) => res.json())
      const pronunciation =
         result[0]?.phonetics[0]?.audio ||
         result[0]?.phonetics[1]?.audio ||
         result[0]?.phonetics[2]?.audio ||
         result[0]?.phonetics[3]?.audio

      if (pronunciation) {
         const audioContext = new AudioContext()
         const audioSource = await fetchAudioData(
            pronunciation,
            audioContext
         )
         audioSource.start()
      }
   } catch (error) {}
}

async function fetchAudioData(url, audioContext) {
   const response = await fetch(url)
   const arrayBuffer = await response.arrayBuffer()
   const audioBuffer = await audioContext.decodeAudioData(
      arrayBuffer
   )
   const audioSource = audioContext.createBufferSource()
   audioSource.buffer = audioBuffer
   audioSource.connect(audioContext.destination)
   return audioSource
}
