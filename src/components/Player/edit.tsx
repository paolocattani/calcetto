import React, { FormEvent, CSSProperties, useState } from 'react';
import { Card, Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useInput } from '../core/hooks/InputHook';
import { TrashIcon, SaveIcon, TimesIcon } from '../core/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PlayerAction } from 'redux/actions';
import { useTranslation } from 'react-i18next';
import { InputField } from 'components/core/generic/Input';
import { PlayerSelector } from 'redux/selectors';
import { UpdatePlayerRequest } from '@common/models';
import { YesNoModal } from 'components/core/generic/Commons';

const modalStyle: CSSProperties = {
  textAlign: 'left',
  width: '100%',
  height: 'auto',
  margin: 'auto',
  color: 'white',
};

const EditPlayer: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const { t } = useTranslation(['common', 'player']);
  const player = useSelector(PlayerSelector.getPlayer)!;
  const [showModalDelete, setShowModalDelete] = useState(false);

  // Fields
  const { value: name, bind: bindName } = useInput<string>(player.name);
  const { value: surname, bind: bindSurname } = useInput<string>(player.surname);
  const { value: alias, bind: bindAlias } = useInput<string>(player.alias);
  const { value: phone, bind: bindPhone } = useInput<string>(player.phone);
  const { value: email, bind: bindEmail } = useInput<string>(player.email);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const request: UpdatePlayerRequest = {
      player: {
        ...player,
        name,
        surname,
        alias,
        phone,
        email,
      },
      history: currentHistory,
    };
    const action = isEdit ? PlayerAction.updatePlayer : PlayerAction.savePlayer;
    dispatch(action.request(request));
  };

  console.log('Rendering player edit: ', player);
  if (!player) {
    setTimeout(() => currentHistory.push('/player'), 3000);
    return <div>Giocatore non trovato</div>;
  }
  const isEdit = !!player.id;

  return (
    <Col md={{ span: '6', offset: '3' }} sm="12">
      <YesNoModal
        message={t('player:delete.message')}
        title={t('player:delete.title')}
        onClick={() => dispatch(PlayerAction.deletePlayers.request({ players: [player] }))}
        onHide={() => setShowModalDelete(false)}
        show={showModalDelete}
      />
      <Card style={modalStyle} className="default-background">
        <Form onSubmit={onSubmit}>
          <Card.Header as="h2">
            <Row>
              <Col md="9">{t(isEdit ? 'player:edit' : 'player:add')}</Col>
              <Col md="3">
                <Button
                  variant="outline-warning"
                  className="float-right"
                  onClick={() => currentHistory.push('/player')}
                >
                  <TimesIcon /> {t('common:close')}
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <InputField
                    controlId="playerName"
                    label={t('player:field.name')}
                    placeholder={t('player:field.name')}
                    required
                    {...bindName}
                  />
                </Col>
                <Col>
                  <InputField
                    controlId="playerSurname"
                    label={t('player:field.surname')}
                    placeholder={t('player:field.surname')}
                    required
                    {...bindSurname}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    controlId="playerAlias"
                    label={t('player:field.alias')}
                    placeholder={t('player:field.alias')}
                    required
                    {...bindAlias}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputField
                    controlId="playerEmail"
                    label={t('player:field.email')}
                    placeholder={t('player:field.email')}
                    required
                    {...bindEmail}
                  />
                </Col>
                <Col>
                  <InputField
                    controlId="playerPhone"
                    label={t('player:field.phone')}
                    placeholder={t('player:field.phone')}
                    required
                    {...bindPhone}
                  />
                </Col>
              </Row>
            </Container>
          </Card.Body>
          <Card.Footer style={{ height: '10vh' }}>
            <Button variant="outline-success" type="submit" className="float-right">
              <SaveIcon /> {t('common:save')}
            </Button>
            {player.editable ? (
              <Button variant="outline-danger" className="float-left" onClick={() => setShowModalDelete(true)}>
                <TrashIcon /> {t('player:delete.one')}
              </Button>
            ) : null}
          </Card.Footer>
        </Form>
      </Card>
    </Col>
  );
};

export default EditPlayer;
