import React, { FormEvent, useState, CSSProperties, lazy } from 'react';
import { Card, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useInput } from '../core/hooks/InputHook';
import DatePicker from 'react-datepicker';
import { TrashIcon, SaveIcon, TimesIcon } from '../core/icons';
import { AuthSelector } from 'redux/selectors/auth.selector';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthAction } from 'redux/actions';
import { useTranslation } from 'react-i18next';
const Delete = lazy(() => import('./Delete'));

const EditUser: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const { t } = useTranslation(['common', 'auth', 'player']);

  const user = useSelector(AuthSelector.getUser)!;
  const [showModalDelete, setShowModalDelete] = useState(false);

  const { value: name, bind: bindName } = useInput<string>(user.name);
  const { value: surname, bind: bindSurname } = useInput<string>(user.surname);
  const { value: phone, bind: bindPhone } = useInput<string>(user.phone);
  const { value: birthday, setValue: setBirthday } = useInput<Date>(user.birthday);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      AuthAction.update.request({
        user: {
          ...user!,
          name: name.trim(),
          surname: surname.trim(),
          phone: phone.trim(),
          birthday,
        },
        history: currentHistory,
      })
    );
  };

  const modalStyle: CSSProperties = {
    textAlign: 'left',
    width: '100%',
    height: 'auto',
    margin: 'auto',
    color: 'white',
  };

  return (
    <Col md={{ span: '6', offset: '3' }} sm="12">
      <Card style={modalStyle} className="default-background">
        <Form onSubmit={onSubmit}>
          <Card.Header as="h2">
            <Row>
              <Col md="9">{t('auth:manage')}</Col>
              <Col md="3">
                <Button variant="outline-warning" className="float-right" onClick={() => currentHistory.push('/')}>
                  <TimesIcon /> {t('auth:close')}
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Container>
              <Form.Group as={Row} controlId="username">
                <Form.Label column>{t('auth:username')}</Form.Label>
                <Col sm="9">
                  <Form.Control
                    plaintext
                    value={user.username!}
                    readOnly
                    style={{ fontSize: 'larger', fontWeight: 'bolder' }}
                    className="default-color-white "
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column>{t('auth:email.email')}</Form.Label>
                <Col sm="9">
                  <Form.Control
                    plaintext
                    value={user.email!}
                    readOnly
                    style={{ fontSize: 'larger', fontWeight: 'bolder' }}
                    className="default-color-white"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="role">
                <Form.Label column>{t('player:role.role')}</Form.Label>
                <Col sm="9">
                  <Form.Control
                    plaintext
                    value={user.role}
                    readOnly
                    style={{ fontSize: 'larger', fontWeight: 'bolder' }}
                    className="default-color-white"
                  />
                </Col>
              </Form.Group>
              <Form.Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>{t('auth:name')}</Form.Label>
                    <Form.Control required type="text" placeholder={t('auth:name')} {...bindName} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="surname">
                    <Form.Label>{t('auth:surname')}</Form.Label>
                    <Form.Control required type="text" placeholder={t('auth:surname')} {...bindSurname} />
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId="phone">
                    <Form.Label>{t('auth:mobile')}</Form.Label>
                    <Form.Control required type="text" placeholder={t('auth:mobile')} {...bindPhone} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="birthday">
                    <Form.Label>{t('auth:birthday')}</Form.Label>
                    <Form.Control
                      as={() => (
                        <DatePicker
                          selected={new Date(birthday)}
                          locale="it-IT"
                          dateFormat="dd/MM/yyyy"
                          onChange={(newValue) => setBirthday(newValue ? newValue : new Date())}
                        />
                      )}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Container>
          </Card.Body>
          <Card.Footer style={{ height: '10vh' }}>
            <Button variant="outline-success" type="submit" className="float-right">
              <SaveIcon /> {t('common:save')}
            </Button>
            <Button variant="outline-danger" className="float-left" onClick={() => setShowModalDelete(true)}>
              <TrashIcon /> {t('auth:delete')}
            </Button>
          </Card.Footer>
        </Form>
        <Delete show={showModalDelete} onHide={() => setShowModalDelete(false)} />
      </Card>
    </Col>
  );
};

export default EditUser;
