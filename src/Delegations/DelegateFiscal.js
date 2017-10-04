import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3'

import { Container, Form, Header} from 'semantic-ui-react'

import ComponentTitle from '../utils/ComponentTitle.js'

class DelegateFiscal extends Component {
    constructor() {
        super();
        this.state = {
            correoFiscal : "",
            apoderadoMesa : "",
            idMesa : 0
        };


    }

    componentWillMount() {
        getWeb3.then(results => {
            this.setState({
            web3: results.web3
            })
        }).catch(() => {
            console.log('Error finding web3.')
        })
    }

    render () {
        return (
            <Container>

                <ComponentTitle title='Definir Fiscal de Mesa'/>

                <Form>

                    <Header as='h3'>Autoridad Superior (Apoderado de Partido)</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Correo del Apoderado"
                        placeholder="Correo del Apoderado de Mesa"
                        value={this.state.apoderadoMesa}
                        onChange={ (event) => { this.setState({ apoderadoMesa : event.target.value }) } }
                    />

                    <Header as='h3'>Fiscal de Mesa</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="Nombre del Fiscal"
                        placeholder="Nombre del Fiscal"
                        value={this.state.correoFiscal}
                        onChange={ (event) => { this.setState({ correoFiscal : event.target.value }) } }
                    />

                    <Header as='h3'>Numero de Mesa</Header>
                    <Form.Input
                        required
                        type="mail"
                        title="ID de Mesa"
                        placeholder="ID de Mesa"
                        value={this.state.idMesa}
                        onChange={ (event) => { this.setState({ idMesa : event.target.value }) } }
                    />

                </Form>

            </Container>

        )
    }
}

export default DelegateFiscal