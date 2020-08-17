import React, { Component } from 'react'
import { View, Modal, TouchableHighlight, Text } from 'react-native'

import DocumentScanner from '@woonivers/react-native-document-scanner'
import { requestExternalStoreageRead } from './permissions'

interface Props {
    onPDFAdd: (event: any) => any
    onRequestClose: () => void
}

class PdfGenerator extends Component<Props> {

    scanner: DocumentScanner;

    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        const teste = await requestExternalStoreageRead()
    }

    handleOnPictureTaken(event: any) {
        alert(JSON.stringify(event))
        this.props.onPDFAdd(event)
    }

    teste = () => {
        console.log(this.scanner)
    }

    render() {
        return (
            <Modal
                transparent
                presentationStyle='overFullScreen'
                onRequestClose={this.props.onRequestClose}
            >
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <DocumentScanner
                        ref={ref => this.scanner = ref}
                        style={{flex: 1, backgroundColor: 'transparent'}}
                        onPictureTaken={this.handleOnPictureTaken}
                        overlayColor="rgba(255,130,0, 0.7)"
                        enableTorch={false}
                        quality={0.5}
                        detectionCountBeforeCapture={5}
                        detectionRefreshRateInMS={50}
                    />
                    <TouchableHighlight
                        onPress={this.teste}
                        style={{ padding: 5, alignItems: 'center' }}>
                        <Text>teste</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        )
    }
}

export default PdfGenerator