import { PermissionsAndroid } from "react-native"

const requestExternalStoreageRead = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
            'title': 'Armazenamento externo',
            'message': 'O aplicativo precisa de permissão para acessar os arquivos do aparelho'
        }
    )
    return granted == PermissionsAndroid.RESULTS.GRANTED
}

const requestCameraAccess = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            'title': 'Acesso à câmera',
            'message': 'O aplicativo precisa de permissão para acessar a câmera'
        }
    )
    return granted == PermissionsAndroid.RESULTS.GRANTED
}

const requestExternalStoreageWrite = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            'title': 'Armazenamento externo',
            'message': 'O aplicativo precisa de permissão para gravar arquivos no aparelho'
        }
    )
    return granted == PermissionsAndroid.RESULTS.GRANTED
}

export { requestExternalStoreageRead, requestCameraAccess, requestExternalStoreageWrite }