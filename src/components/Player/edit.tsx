import React, { FormEvent, useState, CSSProperties } from 'react';
import { Card, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useInput } from '../core/hooks/InputHook';
import { TrashIcon, SaveIcon, TimesIcon } from '../core/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PlayerAction } from 'redux/actions';
import { useTranslation } from 'react-i18next';
import { InputField } from 'components/core/generic/Input';
import { PlayerDTO } from '@common/dto';

interface EditPlayerProps {
  player: PlayerDTO;
}

const EditPlayer: React.FC<EditPlayerProps> = ({ player }) => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const { t } = useTranslation(['player']);

  const [showModalDelete, setShowModalDelete] = useState(false);

  const { value: name, bind: bindName } = useInput<string>(player.name);
  const { value: surname, bind: bindSurname } = useInput<string>(player.surname);
  const { value: alias, bind: bindAlias } = useInput<string>(player.surname);
  const { value: phone, bind: bindPhone } = useInput<string>(player.phone);
  const { value: email, bind: bindEmail } = useInput<string>(player.email);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const model: PlayerDTO = {
      ...player,
      name,
      surname,
      alias,
      phone,
      email,
    };
    dispatch(
      player.id
        ? PlayerAction.updatePlayer.request({ player: model })
        : PlayerAction.savePlayer.request({ player: model })
    );
  };

  const modalStyle: CSSProperties = {
    textAlign: 'left',
    width: '100%',
    height: 'auto',
    margin: 'auto',
    color: 'white',
  };

  return !player ? (
    <div>Giocatore non trovato</div>
  ) : (
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
              <Row>
                <InputField
                  controlId="playerName"
                  label={t('player:field.name')}
                  placeholder={t('player:field.name')}
                  required
                  {...bindName}
                />
                <InputField
                  controlId="playerSurname"
                  label={t('player:field.surname')}
                  placeholder={t('player:field.surname')}
                  required
                  {...bindSurname}
                />
              </Row>
              <Row>
                <InputField
                  controlId="playerAlias"
                  label={t('player:field.alias')}
                  placeholder={t('player:field.alias')}
                  required
                  {...bindAlias}
                />
              </Row>
              <Row>
                <InputField
                  controlId="playerEmail"
                  label={t('player:field.email')}
                  placeholder={t('player:field.email')}
                  required
                  {...bindEmail}
                />
                <InputField
                  controlId="playerPhone"
                  label={t('player:field.phone')}
                  placeholder={t('player:field.phone')}
                  required
                  {...bindPhone}
                />
              </Row>
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
      </Card>
    </Col>
  );
};

export default EditPlayer;
