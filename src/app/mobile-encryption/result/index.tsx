import React,{useState} from 'react';
import * as onComputer from './mobile-ui/onComputer';
import * as onMobile from './mobile-ui/onMobile';

import {AppContainer,DarkButton,Footer, Field,TextArea, Label,CopyToClipboardButton, Title,Help} from '../../elements';
interface BaseProps {
    content: string;
    finish: () => void;
    contentOnComputer: (content: string) => void;
    domain: string;
}
interface ShowOnComputerProps extends BaseProps{
    showOnMobile: (content: string) => void;
}


export const ShowOnComputer: React.FC<ShowOnComputerProps> = ({ content, contentOnComputer, showOnMobile, finish, domain }) => {
    const restart = () => contentOnComputer('');
    const onShowOnMobile=()=>showOnMobile(content);
    onComputer.useConnectMobile({restart,onShowOnMobile,finish});
    return (
        <RenderContentForm content={content} restart={restart} finish={finish}/>
    );

};
export const ShowOnMobile: React.FC<ShowOnMobileProps> = ({ content, contentOnComputer, showOnComputer, finish, domain }) => {
    const restart = () => contentOnComputer('');
    const onShowComputer=()=>showOnComputer(content);
     onMobile.useConnectMobile({content,restart,onShowComputer,finish});
        return (
            <RenderContentForm content={content} restart={restart} finish={finish}/>
        );
};


const RenderContentForm=({content,restart,finish})=>{
    const [expand,setExpand]=useState('encryptedContent');
    return ( <AppContainer>
        <Title>Encrypted Content Received</Title>
        <Field>
                    <TextArea id="encryptedContent"  value={content} placeholder="Empty"
                    onFocus={()=>setExpand('encryptedContent')} readOnly={true}/>
                    <Label htmlFor="encryptedContent">Content to Copy</Label>
                    <CopyToClipboardButton value={content}>Copy</CopyToClipboardButton>
                    <Help expandId='encryptedContent' expand={expand} setExpand={setExpand}>
                    You can now store this encrypted content into a storage you prefer with the confidence that only you can decrypt using your mobile.
                    Note that considering you may loose your phone, you should export the encryption key used in the encryption as an encrypted QR code.
                    Alternatively, you can use another mobile to scan the encryption key to import it into your backup mobile.

                    </Help>
        </Field>
        <Footer>
            <DarkButton onClick={restart}>Encrypt Another Content</DarkButton>
            <DarkButton onClick={finish}>Finish</DarkButton>
        </Footer>
    </AppContainer>
)

};


interface ShowOnMobileProps extends BaseProps {
    showOnComputer: (content: string) => void;
}
