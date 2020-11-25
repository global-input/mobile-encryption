import React, { useCallback } from 'react';
import * as globalInput from 'global-input-react';////global-input-react////

////main////
import * as storage from '../storage';
export const useMobile = (initData: globalInput.InitData | (() => globalInput.InitData), connect: boolean = true) => {
    const connectionSettings = storage.loadConnectionSettings();
    const options: globalInput.ConnectOptions = {
        url: connectionSettings.url,////use your own server"
        apikey: connectionSettings.apikey,
        securityGroup: connectionSettings.securityGroup
    };
    const mobile = globalInput.useGlobalInputApp({
        initData, options, codeAES: connectionSettings.codeKey
    }, connect);
    ////dev-test codeData
    const ConnectQR = useCallback((props: globalInput.ConnectQRProps) => {
        let errorMessage = mobile.isConnectionDenied && "You can only use one mobile app per session. Disconnect to start a new session.";
        if (mobile.isError) {
            errorMessage = mobile.errorMessage;
        }
        return (
            <div>
                <div style={styles.content}>
                    <mobile.ConnectQR {...props} />
                    {errorMessage && (<div style={styles.errorMessage}>{errorMessage}</div>)}
                </div>
            </div>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobile.isError, mobile.isConnectionDenied, mobile.ConnectQR]);
    return { ...mobile, ConnectQR };
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 30,
        position: "absolute",
        zIndex: 100,
    } as React.CSSProperties,
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-center',
        alignItems: 'flex-start'
    } as React.CSSProperties,
    errorMessage: {
        color: 'red',
        fontSize: 11
    }
};