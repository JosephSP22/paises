import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const Pais = ({ resultado }) => {
    const [info, setInfo] = useState([]);
    const [nombre, setNombre] = useState("");
    const [capital, setCapital] = useState("");
    const [region, setRegion] = useState("");
    const [lengua, setLengua] = useState([]);

    useEffect(() => {
        if (resultado) {
            setInfo(resultado);
            const newLengua = [];
            
            Object.values(resultado).forEach((e) => {
                setNombre(e.nome?.abreviado || "");
                setCapital(e.governo?.capital?.nome || "");
                setRegion(e.localizacao?.regiao?.nome || "");

                if (e.linguas) {
                    Object.values(e.linguas).forEach((l) => {
                        newLengua.push(l.nome);
                    });
                }
            });
            
            setLengua(newLengua);
        }
    }, [resultado]);

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{nombre}</Title>
                <Paragraph>Capital: {capital}</Paragraph>
                <Paragraph>Región: {region}</Paragraph>
                <Paragraph>Lenguas: {lengua.join(", ")}</Paragraph>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
});

export default Pais;