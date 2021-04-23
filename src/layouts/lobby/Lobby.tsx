import * as React from "react";
import { useState } from "react";
import Icon from "@material-ui/core/Icon";
import * as DiscordRPC from "discord-rpc"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import "../../assets/css/style.css";



const Lobby = () => (
    <div className="pt-lg-5">
        <div className="stars stars-lobby"/>
        <div className="twinkling twinkling-lobby"/>
        <div className="clouds clouds-lobby"/>
        <Container className="container-cover">
            <Row>
                <main className="inner cover" role="main">
                    <h1 className="cover-headline text-white">Clones</h1>
                    <h1 className="cover-headline text-white">Assimilate</h1>
                    <h1 className="cover-headline text-white">Humanity</h1>
                    <p className="cover-description text-white">A morally questionable party game.</p>
                </main>
            </Row>
            <Row className="pt-lg-4">
                <Col className="col-md-4"></Col>
                <Col className="col-md-4">
                    <Card>
                        <div className="card-body text-center">
                            <h5 className="card-title text-center text-black-50">Got the game code?</h5>
                            <Form>
                                <div className="form-group">
                                    <input type="text" className="form-control" aria-describedby="game-code-help" />
                                    <small id="game-code-help" className="form-text text-muted">Which game room are we going to lads?</small>
                                </div>
                            </Form>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
        <Container>
        </Container>
    </div>
)

export default Lobby;