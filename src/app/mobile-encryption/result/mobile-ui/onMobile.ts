import { useMobile } from '../../../mobile';
export const FIELDS = {
    info: {
        type: "info",
        value: 'You can now copy the encrypted content into your clipboard.'
    },
    content: {
        id: "encryptedContent",
        label: "Encrypted Content",
        type: 'text',
        nLines: 5,
        value: ''
    },
    showOnComputer: {
        id: "showOnComputer",
        label: "Back",
        type: "button",
        viewId: "row1"
    },
    restart: {
        id: "restart",
        label: "Restart",
        type: "button",
        viewId: "row1"
    },
    finish: {
        id: "finish",
        label: "Finish",
        type: "button",
        viewId: "row1"
    },
};
const initData = (content) => ({
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
        fields: [FIELDS.info, { ...FIELDS.content, value: content }, FIELDS.showOnComputer, FIELDS.restart, FIELDS.finish]
    }
});

export const useConnectMobile = ({content,restart,onShowComputer,finish}) =>{
    const mobile = useMobile(()=>initData(content), true);
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.restart.id:
                restart();
                break;
            case FIELDS.showOnComputer.id:
                onShowComputer();
                break;
            case FIELDS.finish.id:
                finish();
                break;

            default:
        }
    });
    return mobile;
}
