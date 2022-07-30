import fs from 'fs';
import { google } from 'googleapis';

const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/contacts',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];
const TOKEN_PATH = 'token.json';

// Prevents access from functionCall methods if there is no valid credentials and tokens
export const googleGuard = (credentials, functionCall, expressRes) => {
    fs.readFile(credentials, (err, content) => {
        if (err) {
            console.log('Error loading client secret file:', err);
            return;
        }
        const credentialsJson = JSON.parse(content);
        const {client_secret, client_id, redirect_uris} = credentialsJson.web;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        fs.readFile(TOKEN_PATH, (err, token) => {
            if (err) {
                expressRes.redirect("/logout");
                return console.log("Issue with Token, please login again");
            }
            oAuth2Client.setCredentials(JSON.parse(token));
            functionCall(oAuth2Client);
        });
    });    
}

// Creates a new token based on obtained information from Google Oauth2 platform
export const createToken = async (credentialsJson, code, res) => {
    const content = fs.readFileSync(credentialsJson, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        return content;
    });
    const credentials = JSON.parse(content);
    
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    
    oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
            res.redirect("/");
        });
    });
}

// Generates a new Google Oauth2 url for authentication
export const getAuthUrl = (credentialsJson) => {
    const content = fs.readFileSync(credentialsJson, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        return content;
    });
    const credentials = JSON.parse(content);
    
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    
    return {authUrl, oAuth2Client};
}