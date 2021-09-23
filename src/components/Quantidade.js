import React from 'react';
import { useResult } from '../providers/Store';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';

const Quantidade = () => {
  const { quantidade, setQuantidade } = useResult();
  const limiteDigitos = 2;

  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const mascaraCampoTexto = (numero) => {
    if (isNumber(numero)) {
      return numero
    } else {
      return numero.replace(/([^\d])+/gim, '');
    }
  }

  const handleChangeQuantidade = (evt) => {
    evt.preventDefault();
    setQuantidade(evt.target.value)
  }


  //Nesse componente podemos mandar as respostas das questões para o localStorage
  return (
    <div>
      <div>Questões de conhecimentos gerais</div>
      <Form>
        <Row>
          <Col md={2} sm={4} xs={6}>
            <Form.Group>
              <Form.Label>Escolha uma quantidade de questões.</Form.Label>
              <Form.Control type="text" onChange={handleChangeQuantidade} value={mascaraCampoTexto(quantidade)} maxLength={limiteDigitos} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={4} xs={6}>
            <Link to="/inicia-teste">Confirmar</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Quantidade;
