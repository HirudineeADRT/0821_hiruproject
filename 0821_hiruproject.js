const SL_XML = require('slappforge-sdk-xml');
const xmlParser = new SL_XML.XMLParser();
const xPathEvaluator = new SL_XML.XPathEvaluator();
const Alexa = require('ask-sdk');
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("This is a test");
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

        const response = await skill.invoke(event, context);
        //console.log('RESPONSE :' + JSON.stringify(response));
        return response;
    };
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
    const ErrorHandler = {
        canHandle(handlerInput) {
            return true;
        },
        handle(handlerInput, error) {
            console.log('Error handled: ' + JSON.stringify(error.message));
            // console.log('Original Request was:', JSON.stringify(handlerInput.requestEnvelope.request, null, 2));

            const speechText = 'Sorry, your skill encountered an error';
            return handlerInput.responseBuilder
                .speak(speechText)
                .withShouldEndSession(false)
                .getResponse();
        }
    };

    try {
        let data = await ddb.get({
            TableName: "hirutestddb",
            Key: {
                Name: "test"
            }
        }).promise();

    } catch (err) {
        console.log("This is a test");

        // error handling goes here
    };

    try {
        let data = await ddb.get({
            TableName: "hirutestddb",
            Key: {
                Name: "test"
            }
        }).promise();

    } catch (err) {
        consoel.log(test);
        console.test(sample);
        // error handling goes here
    };

    return { "message": "Successfully executed" };
};