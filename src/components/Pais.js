import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const Pais = ({ resultado }) => {
    const [nombre, setNombre] = useState("");
    const [capital, setCapital] = useState("");
    const [region, setRegion] = useState("");
    const [lengua, setLengua] = useState([]);
    const [area, setArea] = useState("");
    const [codigoPais, setCodigoPais] = useState("");

    useEffect(() => {
        if (resultado && Object.keys(resultado).length > 0) {
            setNombre(resultado.name?.common || "");
            setCapital(resultado.capital?.[0] || "");
            setRegion(resultado.region || "");
            setArea(resultado.area || "");
            setCodigoPais(resultado.cca2?.toLowerCase() || "");

            const idiomas = resultado.languages
                ? Object.values(resultado.languages)
                : [];
            setLengua(idiomas);
        }
    }, [resultado]);

    return (
        <Card style={styles.card}>
            {codigoPais && (
                <View style={styles.banderaContainer}>
                    <Image
                        source={{ uri: `https://flagcdn.com/w320/${codigoPais}.png` }}
                        style={styles.bandera}
                        resizeMode="cover"
                    />
                </View>
            )}
            <Card.Content>
                <Title>{nombre}</Title>
                <Paragraph>Capital: {capital}</Paragraph>
                <Paragraph>Región: {region}</Paragraph>
                <Paragraph>Lenguas: {lengua.join(", ")}</Paragraph>
                {area && <Paragraph>Área: {area} km²</Paragraph>}
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
    },
    banderaContainer: {
        width: '100%',
        height: 180,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    bandera: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});

export default Pais;