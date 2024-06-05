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
         const audio = new Audio(pronunciation)
         // console.log('audio: ', audio)
         // audio.play()
         return { hasHumanVoice: true, synonyms: synonyms }
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
         const icon = '👩‍🦲'
         const audio = new Audio(pronunciation)
         console.log('audio: ', audio)
         audio.play()
         return { hasHumanVoice: true, icon }
      } else {
         const icon = '❌'
         return { hasHumanVoice: false, icon }
      }
   } catch (error) {
      const icon = '❌'
      return { hasHumanVoice: false, icon }
   }
}

function testAudioFile(audioUrl) {
   // Fetch the audio file
   fetch(audioUrl)
      .then((response) => {
         // Check if the response is successful (status code 200)
         if (response.ok) {
            // Create a new Audio object
            const audio = new Audio(audioUrl)

            // Add an event listener to check when the audio is loaded
            audio.addEventListener('canplaythrough', () => {
               console.log('Audio file is playable.')
               // Here you can save the URL since the audio file is playable
            })

            // Add an event listener to handle loading errors
            audio.addEventListener('error', () => {
               console.error('Failed to load audio file.')
               // Handle the error accordingly (e.g., show an error message)
            })

            // Start loading the audio
            audio.load()
         } else {
            console.error(
               'Failed to fetch audio file. HTTP status:',
               response.status
            )
            // Handle the error accordingly (e.g., show an error message)
         }
      })
      .catch((error) => {
         console.error('Error fetching audio file:', error)
         // Handle the error accordingly (e.g., show an error message)
      })
}

async function testAudioFile2(audioUrl) {
   try {
      const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
      const response = await fetch(corsProxyUrl + audioUrl)

      if (response.ok) {
         const audioBlob = await response.blob()
         const audioUrlObject = URL.createObjectURL(audioBlob)

         const audio = new Audio(audioUrlObject)

         audio.addEventListener('canplaythrough', () => {
            console.log('Audio file is playable.')
            // Here you can save the URL since the audio file is playable
         })

         audio.addEventListener('error', () => {
            console.error('Failed to load audio file.')
            // Handle the error accordingly (e.g., show an error message)
         })

         audio.load()
      } else {
         console.error(
            'Failed to fetch audio file. HTTP status:',
            response.status
         )
         // Handle the error accordingly (e.g., show an error message)
      }
   } catch (error) {
      console.error('Error fetching audio file:', error)
      // Handle the error accordingly (e.g., show an error message)
   }
}

// Call the function with the audio URL
