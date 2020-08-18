import React, { Component } from "react";

import PDF from 'react-native-pdf'
import { Modal, View } from "react-native";

interface Props {
    onRequestClose: () => void
    source: string
}

class PDFViewer extends Component<Props> {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Modal
                transparent
                presentationStyle='overFullScreen'
                onRequestClose={this.props.onRequestClose}
            >
                <View
                    style={{flex: 1, padding: 20}}
                >
                    <PDF
                        style={{flex: 1}}
                        source={{ uri: this.props.source }}
                    />
                </View>
            </Modal>
        )
    }

}

export default PDFViewer