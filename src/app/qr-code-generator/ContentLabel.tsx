
import React, { useState } from 'react';
import styled from 'styled-components';

import { InputWithLabel, FormContainer, FormFooter, TextButton, DisplayErrorMessage } from '../app-layout';
import { useMobile,ConnectWidget} from '../mobile';
import importEncryptOnMobileImage from './images/encrypt-on-mobile.png';
interface Props {
        back: () => void;
        next: (content: string, label: string) => void;
}
export const ContentLabel: React.FC<Props> = ({ back, next }) => {
        const [content, setContent] = useState('');
        const [label, setLabel] = useState('');

        const initData = {
                dataType: "qrcode",
                form: {
                        title: "QR Code Content",
                        fields: Object.values(FIELDS)
                }
        }
        const mobile = useMobile(initData, true);
        const onContentChange = (content: string) => {
                setContent(content);
                mobile.sendValue(FIELDS.content.id, content);
        };
        const onLabelChanged = (label: string) => {
                setLabel(label);
                mobile.sendValue(FIELDS.label.id, content);
        }
        const onNext = () => {
                if (content.trim().length) {
                        next(content, label);
                }
        }
        mobile.setOnchange(({ field }) => {
                switch (field.id) {
                        case FIELDS.content.id:
                                setContent(field.value as string);
                                break;
                        case FIELDS.label.id:
                                setLabel(field.value as string);
                                break;
                        case FIELDS.back.id:
                                back();
                                break;
                        case FIELDS.next.id:
                                onNext();
                                break;
                        default:

                                break;
                }
        });
        return (
                <Container>
                <AppTitle>Mobile Encryption</AppTitle>
                <SourceLink>Source Code</SourceLink>
                <Content>
                <Title>Encrypt a content on your mobile</Title>
                <ConnectWidget mobile={mobile}/>
                {mobile.isConnected && (<>
                <P>You can now press <EncryptOnMobileIcon/> button on your mobile to encrypt a piece of information. The mobile app sends
                the encrypted content generated on your mobile to this application, which displays the received content in the following text box.</P>
                                        <InputWithLabel label="Content to decrypt" id="content"
                                                onChange={onContentChange}
                                                type="textarea"
                                                value={content} />

                                        <InputWithLabel id="label" value={label} label="Label" type="text" onChange={onLabelChanged} />
                                </>)}
                        <FormFooter>
                                <TextButton onClick={back} label='Back' />
                                {mobile.isConnected && (<TextButton onClick={onNext} label='Next' />)}
                        </FormFooter>
                </Content>





                </Container>


        );
};

const FIELDS = {
        content: {
                id: "content",
                label: "Content for the QR Code",
                value: ""
        },
        label: {
                id: "label",
                label: "Label for the QR Code",
                value: ""
        },
        back: {
                id: "back",
                label: "Back",
                type: "button",
                icon: "back",
                viewId: "foot"
        },
        next: {
                id: "next",
                label: "Next",
                type: "button",
                icon: "continue",
                viewId: "foot"
        },
        info: {
                type: 'info',
                value: 'You may press the "Encrypt" icon below to generate an encrypted content',
                viewId: 'info'
        }
};


const Container =styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100vw;
    height:100vh;
    backgroundColor: rgb(219,240,240);
`;


const P = styled.div`
    font-size: 16px;
`;


const AppTitle=styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    font-size: 1em;
    color: #445566;
    font-family: Georgia, Times, Serif;
    @media screen and (min-width:250px) and (min-height:250px){
        font-size:1.5em;
        margin-bottom:10px;
    }

    @media screen and (min-width:400px){
        font-size:2em;
    }
},`;
const Title=styled.div`
    color: #445566;
    font-family: Georgia, Times, Serif;
    font-size: 1em;
    @media screen and (min-width:250px) and (min-height:250px){
        font-size:1.4em;
    }
    @media screen and (min-width:400px){
            font-size:1.3em;
     }
`;

const SourceLink=styled.a.attrs({
        href:'https://github.com/global-input/mobile-encryption',
        rel:'noreferrer noopener',
        target:'_blank'})`
        color: #153E85;
        font-weight: 100;
        font-family: Georgia, Times, Serif;
        font-size: 0.8em;
        @media screen and (min-width:250px) and (min-height:250px){
            font-size:1em;
            margin-bottom:10px;
        }
        @media screen and (min-width:400px){
            font-size:1.5em;
        }

        `;

const Content=styled.div`
    width:95%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items:flex-start
    align-items: center;
    padding:10px;
`;

const EncryptOnMobileIcon=styled.img.attrs({
    src:importEncryptOnMobileImage,
    alt:'Encrypt'
})``;