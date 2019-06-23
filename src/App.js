import React from 'react';
import './App.css';
import {Navbar, NavbarBrand} from 'reactstrap';
import Images from "./classifier/images";


export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header fixed-top">
                    <Navbar>
                        <NavbarBrand>
                            <h1 className="display-3">Paintings classification</h1>
                        </NavbarBrand>
                    </Navbar>
                </header>
                <main style={{paddingTop: 140}}>
                    <Images/>
                </main>
            </div>
        );
    }
}












