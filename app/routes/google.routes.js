const router = require('express').Router();
const {google} = require('googleapis');

const GOOGLE_CLIENT_ID = '628486044277-q4rpr485ikcvtlsu80klkba6lvglvogm.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const REFRESH_TOKEN = '1//0cnvVZhvYv4NWCgYIARAAGAwSNwF-L9Ir5qHCn0IH1WIqqCTsvWXycywH-tzawFxorUhduYVae44i-vP4NeqSKlfxHq2Q6aptN9g'
const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:8081'
)

router.get('/', async (req,res,next) => {
    res.send({message: 'Ok, api is working'});
});

router.post('/create-tokens', async (req,res,next) => {
    try{
        const {code} = req.body
        const {tokens} = await oAuth2Client.getToken(code)
        res.send(tokens)
        // res.send(code)
    } catch(err) {
        next(err)
    }
})

router.post('/create-event', async (req, res, next)=> {
    try {
        const {summary, description,location,startDateTime,endDateTime} = req.body;
        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
        const calendar = google.calendar('v3')
        const response = await calendar.events.insert({
            auth: oAuth2Client,
            calendarId: 'primary',
            requestBody: {
                summary: summary,
                description: description,
                location: location,
                colorId: '6',
                start: {
                    dateTime: new Date(startDateTime),
                },
                end: {
                    dateTime: new Date(endDateTime),
                },
            },
        })
        res.send(response)
    } catch (error) {
        next(error)
    }
})
module.exports = router;