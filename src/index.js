import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import PdfGenerator from './PdfGenerator'

class Application extends Component {

    constructor(props) {
        super(props)

        this.state = {

            exibirCriadorDePDF: false,

            PDFs: []
        }
    }

    adicionarPDF = (pdf) => {
        this.setState({ PDFs: [...this.state.PDFs, pdf], exibirCriadorDePDF: false })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>Lista de PDFs</Text>
                {this.state.PDFs.map(pdf => <Text>{JSON.stringify(pdf, null, '\n')}</Text>)}
                <TouchableHighlight
                    underlayColor='blue'
                    onPress={() => this.setState({ exibirCriadorDePDF: true })}
                    style={{ alignSelf: 'stretch', backgroundColor: 'lightgrey', padding: 10 }}
                >
                    <Text>Adicionar PDF</Text>
                </TouchableHighlight>

                {this.state.exibirCriadorDePDF &&
                    <PdfGenerator
                        onRequestClose={() => this.setState({ exibirCriadorDePDF: false })}
                        onPDFAdd={this.adicionarPDF}
                    />
                }
            </View>
        )
    }
}

export default Application