import React, { useState } from 'react';
import { useResult } from '../providers/Store';
import { Redirect } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useFormik } from "formik";
import * as yup from "yup";

const Quantidade = () => {
  const { quantidade, setQuantidade } = useResult();
  const [prosseguir, setProsseguir] = useState(false);
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

  const initialValues = {
    quantidade: quantidade
  }

  const validationSchema = {
    quantidade: yup.number()
      .typeError('')
      .min(1, "Escolha pelo menos uma questão")
      .max(50, "Existem 50 questões no máximo")
      .required("Escolha uma quantidade")
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape(validationSchema),

    onSubmit: (values) => {
      setQuantidade(values.quantidade);
      setProsseguir(true);
    }
  })


  //Nesse componente podemos mandar as respostas das questões para o localStorage
  return (
    <div>
      <div>Questões de conhecimentos gerais</div>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={2} sm={4} xs={6}>
            <Form.Group>
              <Form.Label>Escolha uma quantidade de questões.</Form.Label>
              <Form.Control
                type="text"
                name="quantidade"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={mascaraCampoTexto(formik.values.quantidade)}
                maxLength={limiteDigitos} />

              {formik.errors.quantidade && formik.touched.quantidade ? (
                <div>{formik.errors.quantidade}</div>
              ) : null}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={4} xs={6}>
            <button type="submit" >
              Confirmar
            </button>
          </Col>
        </Row>
      </Form>
      {prosseguir && <Redirect to="/inicia-teste" />}
    </div>
  );
}

export default Quantidade;
