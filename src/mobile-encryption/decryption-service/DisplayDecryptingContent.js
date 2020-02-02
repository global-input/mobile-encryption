import React, {useEffect} from 'react';

import PageContainer from '../generic-example-container';
import {Title,P,ContentContainer,TextAreaBox, TextButton,ErrorMessage} from '../basic-app-layout';
import * as actions from '../actions';

const decryptedContentId='decryptedContent'

export default ({dispatch,mobile, content,decryptedContent,errorMessage}) => {
    
    useEffect(()=>{            
            const mobileConfig=buildMobileConfig({dispatch,content});            
            mobile.sendInitData(mobileConfig);
    },[]);          
        const copyToClipboard=()=>{
            document.getElementById(decryptedContentId).select();
            document.execCommand("Copy");                      
        }
        if(decryptedContent){
            return(
                
                    <ContentContainer>
                      <Title>Mobile Decryption</Title>
                    <P>The encrypted content received from your mobile is displayed in the following text box.
                    You may click on the "Copy" button to copy the content into your clipboard</P>
                    
                        <TextButton label="Copy" onClick={copyToClipboard}/>
                        <ErrorMessage errorMessage={errorMessage}/>                        
                        <TextAreaBox id={decryptedContentId} value={decryptedContent}/>
                        
                    </ContentContainer>
                
            );
                
        }
        else{
            return(
                
                  <ContentContainer>
                    <Title>Mobile Decryption</Title>
                    <P>The encrypted content is sent to your mobile for decryption. Now you can operate on your mobile to decrypt the content</P>
                  </ContentContainer>
               
            );
        }
        
                     
};

const buildMobileConfig=({dispatch,content})=>{
        const onDecryptedContent=decryptedContent=>{
            console.log("-----decrpted:"+decryptedContent);
            if(!decryptedContent){
              actions.decryptionService.failed({dispatch, errorMessage:'You might have selected a wrong encryption key or there was something wrong with the encrypted content.'});              
            }
            else{
              actions.decryptionService.setDecryptedContent({dispatch,decryptedContent});
            }
            
        };
        return {
            action:"input",
            dataType:"form",
            key:"general",
            form:{
              title:"Mobile Decryption",
              fields:[{
                label:"Content",
                type:'decrypt',
                id:"content",
                value:content,
                operations:{
                  onInput:onDecryptedContent

                }
              },{
                type:"info",
                value:"The decrypted content has now been sent to the application."
              },{
                label:"Back",
                type:"button",
                id:"back",
                icon:'back',                                                    
                operations:{
                  onInput:()=>actions.decryptionService.init({dispatch})
                }
              }]
            }
       };
}