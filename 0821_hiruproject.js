const Alexa = require('ask-sdk');
let skill;

exports.handler = async function (event, context) {
    //console.log('REQUEST ' + JSON.stringify(event));
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addErrorHandlers(ErrorHandler)
            .addRequestHandlers(    
            // delete undefined built-in intent handlers
            CancelIntentHandler,
            HelpIntentHandler,
            
            StopIntentHandler,
            NavigateHomeIntentHandler,
            FallbackIntentHandler,
            LaunchRequestHandler,
            SessionEndedRequestHandler
            // add custom Intent handlers
            ).create();
    }
    const HelpIntentHandler = {
        canHandle(handlerInput) {
            return handlerInput.requestEnvelope.request.type === 'IntentRequest'
                && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
        },
        handle(handlerInput) {
            // invoke logic of the builtin handler
            const speechText = 'This is a builtin intent handler';
            return handlerInput.responseBuilder
                .speak(speechText)
                .withShouldEndSession(false)    // set to true for Cancel or Stop intents etc
                .getResponse();
        }
    };

    const response = await skill.invoke(event, context);
    //console.log('RESPONSE :' + JSON.stringify(response));
    return response;
};
