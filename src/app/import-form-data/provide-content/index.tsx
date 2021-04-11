import React, { useCallback, useState } from 'react';
import { useMobile } from '../../mobile';
import {AppContainer, Title,
    Footer,DarkButton, Field,TextArea, Label,Help} from '../../components';

    const FIELDS = {
        info: {
            id: "info",
            type: 'info',
            value: ['Waiting for content from the connected application.'],
            viewId:'info'
        },
        cancel: {
            id: "cancel",
            type: "button",
            label: "Cancel",
            viewId: "row1",
            icon:'cancel'
        }        
    }
    const initData = {
        form: {
            title: "Import Form Data",
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

    const useConnectMobile = ({cancel}) =>{
        const mobile = useMobile(initData, true);
        mobile.setOnchange(({ field }) => {
            switch (field.id) {
                case FIELDS.cancel.id:
                    cancel();
                    break;                
                default:
            }
        });
        return mobile;
    }

interface PROPS{
    
    startImport: (content: string) => void;
    cancel: () => void;
    domain: string;
}


export const ProvideContent: React.FC<PROPS> = ({startImport, cancel, domain }) => {
    const [content, setContent] = useState('');
    const [expand,setExpand]=useState('contentToImport');    
    const onImport=()=>{
        if(content.trim().length){
            startImport(content);
        }
    };


    const mobile = useConnectMobile({cancel});    
        return (<AppContainer>
            <Title>Importing Form Content</Title>
            <Field>
                    <TextArea id="contentToImport" onChange={evt=>{
                      setContent(evt.target.value);
                    }} value={content} placeholder="Paste the content here."
                    onFocus={()=>setExpand('contentToImport')}/>
                    <Label htmlFor="contentToImport">Content to Decrypt</Label>
                    <Help expandId='contentToImport' expand={expand} setExpand={setExpand}>
                    Please provide the encrypted form content that you like to send your mobile app.                    
                    </Help>
            </Field>
            <Footer>
                <DarkButton onClick={cancel}>Cancel</DarkButton>
                <DarkButton onClick={onImport}>Send to Mobile</DarkButton>
            </Footer>
    </AppContainer>
   );
};







