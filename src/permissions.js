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

export { requestExternalStoreageRead }