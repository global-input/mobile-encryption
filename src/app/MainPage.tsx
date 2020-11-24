import React from 'react';
//+//import { useHistory } from 'react-router-dom'; ////website

import { useMobile } from './mobile';

import { AppFooter, MessageContainer, MessageButton, MessageLink, RowCenter } from './app-layout';

//+//import * as mobileUI from '../../mobile-ui'; ////website
interface Props {
    domain: string;
    encryption: () => void;
    decryption: () => void;
    editConnectionSettings: () => void;
    qrCodeGenerator: () => void;
}


const MainPage: React.FC<Props> = ({ domain, encryption, decryption, editConnectionSettings, qrCodeGenerator }) => {
    //+//const history = useHistory();////website
    const mobile = useMobile(initData);
    mobile.setOnFieldChange((field) => {
        switch (field.id) {
            case FIELDS.encryption.id:
                encryption();
                break;
            case FIELDS.decryption.id:
                decryption();
                break;
            case FIELDS.qrCodeGenerator.id:
                qrCodeGenerator();
                break;
            default:
            //+//mobileUI.addField.onFieldChange(field, history); ////website
        }
    });

    const NotConnected = () => (
        <AppFooter>
            <MessageButton label="Settings" onClick={editConnectionSettings} />
            <MessageLink href="https://github.com/global-input/mobile-encryption">Source Code</MessageLink>
        </AppFooter>
    )

    return (
        <mobile.ControlledContainer title="Mobile Encryption" domain={domain} notConnected={<NotConnected />}>
            <MessageContainer>
                You can now operate on your mobile.
            </MessageContainer>
            <RowCenter>{mobile.disconnectButton}</RowCenter>
        </mobile.ControlledContainer>
    );
}


const FIELDS = {
    qrCodeGenerator: {
        id: 'qr-code-generator',
        type: "button",
        label: "Encrypted QR Code",
        icon: "qrcode",
        viewId: "row1",
    },
    encryption: {
        id: 'mobile-encryption',
        type: 'button',
        label: 'Encryption',
        icon: "encrypt",
        viewId: "row2"
    },
    decryption: {
        id: 'mobile-decryption',
        type: 'button',
        icon: "decrypt",
        label: 'Decryption',
        viewId: "row2"
    }
};
//+//mobileUI.addField.add(FIELDS);////website
const initData = {
    id: "mobile-encryption-main",
    form: {
        title: "Please Select",
        fields: Object.values(FIELDS)
    }
};


export default MainPage;