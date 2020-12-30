import { useMobile } from '../../../mobile';
export const FIELDS = {
    info: {
        id: "info",
        type: "info",
        value: ''
    },
    content: {
        id: "contentOnMobile",
        type: 'text',
        nLines: 5,
        value: '',
    },
    back: {
        id: 'backToComposeOnComputer',
        type: 'button',
        label: 'Back',
        viewId: "row1",
        icon:'back'
    },
    cancel: {
        id: 'cancel',
        type: 'button',
        label: 'Cancel',
        viewId: "row1",
        icon:'cancel'
    },

    encrypt: {
        id: "toEncrypt",
        type: "button",
        label: "Encrypt",
        viewId: "row1",
        icon:'encrypt'
    }
}
const initData = (initialContent) => ({
    form: {
        title: "Content To Encrypt",
        views: {
            viewIds: {
                row1:{
                    style:{
                        display:'flex',
                        justifyContent:'space-between',
                        width:'100%',
                    }
                }
                                }
        },
        fields: [{ ...FIELDS.content, value: initialContent }, FIELDS.info,FIELDS.back, FIELDS.cancel, FIELDS.encrypt]
    }
});

export const useConnectMobile = ({initialContent,cancel,back,setContent,onEncrypt}) =>{
    const mobile = useMobile(()=>initData(initialContent), true);
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.back.id:
                back();
                break;
            case FIELDS.content.id:
                setContent(field.value as string);
                break;
            case FIELDS.cancel.id:
                cancel();
                break;
            case FIELDS.encrypt.id:
                onEncrypt();
                break;
            default:
        }
    });
    return mobile;
}
