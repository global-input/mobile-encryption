import React from 'react';

import { Tips, TipTitle, Tip, TipContent} from '../common-elements';
import {GenerateQRCodeImage,EncryptImage,DecryptImage,ExportIcon} from './icons';


export const TipsOnButton = () => (
    <Tips>
        <TipTitle>
            Press the buttons on your mobile:
        </TipTitle>
        <Tip>
            <GenerateQRCodeImage />
            <TipContent>
                Encrypting a short content on your mobile and send it to this application to create an Encrypt QR Code. Only your mobile can scan and decrypt it.
            </TipContent>
        </Tip>

        <Tip>
            <EncryptImage />
            <TipContent>
                Asking your mobile app to encrypt a piece of content. The encrypted content received by this application 
                can only be decrypted by your mobile.
                                                </TipContent>
        </Tip>
        <Tip>
            <DecryptImage />
            <TipContent>
                Asking your mobile app to decrypt a piece of content. 
            </TipContent>
        </Tip>
        <Tip>
            <ExportIcon />
            <TipContent>
                Exporting all the form data in your mobile app for backup purposes.                 
                The exported data only be decrypted when it is imported back into your mobile app.
            </TipContent>
        </Tip>


        
    </Tips>
);
