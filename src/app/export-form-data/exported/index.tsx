import React,{useState} from 'react';

import {AppContainer,DarkButton,Footer, Field,TextArea, Label,CopyToClipboardButton, Title,Help} from '../../components';
import { useMobile,ConnectWidget} from '../../mobile';
export const FIELDS = {
    info: {
        type: "info",
        value: "You can now check the connected application, which should have received the exported content."
    },   
    finish: {
        id: "finish",
        label: "Finish",
        type: "button",
        viewId: "row1"
    },
};

const initData = {
    form: {
        title: "Content Exported",
        views: {
            viewIds: {
                info: {
                    style: {
                        marginBottom:20,
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center'
                    }
                },
                row1:{
                    style:{
                        display:'flex',
                        justifyContent:'space-between',

                        width:'100%',


                    }


                }
                                }
        },

        fields: Object.values(FIELDS)
    }
};

const useConnectMobile = ({finish}) =>{
    const mobile = useMobile(initData, true);
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
           
            case FIELDS.finish.id:
                finish();
                break;
            default:
        }
    });
    return mobile;
}

interface Props {
    domain: string;
    content: string;    
    finish: () => void;


}
export const ContentExported: React.FC<Props> = ({ content, finish, domain }) => {
    const mobile=useConnectMobile({finish});       
    const [expand,setExpand]=useState('exportedContent');
    return ( <AppContainer>
        <Title>Content Received</Title>
        <Field>
                    <TextArea id="exportedContent"  value={content} placeholder="Empty"
                    onFocus={()=>setExpand('exportedContent')} readOnly={true}/>

                    <Label htmlFor="exportedContent">Exported Content</Label>
                    <CopyToClipboardButton value={content}>Copy</CopyToClipboardButton>
                    <Help expandId='exportedContent' expand={expand} setExpand={setExpand} position={2}>
                    You can now store this encrypted content into a storage you prefer with the confidence that only you can decrypt using your mobile.
                    Note that you should separately export the encryption key used in the encryption as an encrypted QR code considering the possibility you may loose your phone.
                    Alternatively, you can use another mobile to scan the encryption key to have a backup.
                    </Help>

        </Field>
        <Footer>
            
            <DarkButton onClick={finish}>Finish</DarkButton>
        </Footer>
    </AppContainer>
)

};
