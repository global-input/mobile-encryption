import { useMobile } from '../../../mobile';
export const FIELDS = {
    info: {
        type: "info",
        value: ['You can now copy the encrypted content into your clipboard on your computer (in the extension window).',
            'You can also load the encrypted content into your mobile by pressing the "Load into Mobile" button.']
    },
    restart: {
        id: "restart",
        label: "Restart",
        type: "button",
        viewId: "row1"
    },
    showOnMobile: {
        id: "showOnMobile",
        label: "Load into Mobile",
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

const initData = {
    form: {
        title: "Encryption Completed",
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

export const useConnectMobile = ({restart,onShowOnMobile,finish}) =>{
    const mobile = useMobile(initData, true);
    mobile.setOnchange(({ field }) => {
        switch (field.id) {
            case FIELDS.restart.id:
                restart();
                break;
            case FIELDS.showOnMobile.id:
                onShowOnMobile();
                break;
            case FIELDS.finish.id:
                finish();
                break;
            default:
        }
    });
    return mobile;
}
