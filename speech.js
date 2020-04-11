if (!webkitSpeechRecognition)
	throw "Speech recognition is not supported."

const SpeechRecognition = webkitSpeechRecognition;

function recognizeSpeech(languageCode) {
	const recognition = new SpeechRecognition();
	recognition.lang = languageCode;
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;
	
	return new Promise((resolve, reject) => {
		recognition.onresult = function(event) {
			const last = event.results.length - 1;
			const text = event.results[last][0].transcript;
			resolve({"result": true, "speech": text});
		};

		recognition.onnomatch = function(event) {
			resolve({"result": false, "speech": null});
		};

		recognition.onspeechend = function() {
			recognition.stop();
		};

		recognition.onerror = function(event) {
			reject(event.error);
		}

		recognition.start();
	});
}
