(this.webpackJsonpcalcetto = this.webpackJsonpcalcetto || []).push([
  [2],
  {
    12: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return o;
      }),
        r.d(t, 'b', function () {
          return s.a;
        }),
        r.d(t, 'f', function () {
          return u.a;
        }),
        r.d(t, 'c', function () {
          return i.a;
        }),
        r.d(t, 'd', function () {
          return l;
        }),
        r.d(t, 'e', function () {
          return d;
        });
      var n = r(14),
        a = r(16),
        c = r(20),
        o = {
          fetch: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Pair]', 'Fetch Pairs')))(),
          purge: Object(a.createAction)(c.a)(),
        },
        s = r(28),
        u = r(26),
        i = r(18),
        l = {
          updateSelectedPairs: a.createAsyncAction.apply(
            void 0,
            Object(n.a)(Object(c.b)('[Stage1]', 'Update Selected Pairs Stage1'))
          )(),
          stage1Watcher: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Stage1]', 'Stage1 Watcher')))(),
          fetchStage1: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Stage1]', 'Fetch Stage1')))(),
          updateCellStage1: a.createAsyncAction.apply(
            void 0,
            Object(n.a)(Object(c.b)('[Stage1]', 'Update Cell Stage1'))
          )(),
          updatePlacement: a.createAsyncAction.apply(
            void 0,
            Object(n.a)(Object(c.b)('[Stage1]', 'Update Placement Stage1'))
          )(),
          purge: Object(a.createAction)(c.a)(),
        },
        d = {
          fetchStage2: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Stage2]', 'Fetch Stage2')))(),
          updateCell: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Stage2]', 'Update Cell Stage2')))(),
          delete: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Stage2]', 'Delete Stage2')))(),
          setCells: a.createAction.apply(void 0, Object(n.a)(Object(c.c)('[Stage2]', 'Set Cells')))(),
          setLoading: a.createAction.apply(void 0, Object(n.a)(Object(c.c)('[Stage2]', 'Stage2 is Loading')))(),
          purge: Object(a.createAction)(c.a)(),
        };
    },
    137: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return n;
      });
      var n = {
        isLoading: function (e) {
          return e.tournamentState.isLoading;
        },
        getTournament: function (e) {
          return e.tournamentState.tournament;
        },
        getTournamentsList: function (e) {
          return e.tournamentState.tournamentsList;
        },
      };
    },
    142: function (e, t) {},
    143: function (e, t, r) {
      'use strict';
      var n;
      r.d(t, 'a', function () {
        return n;
      }),
        (function (e) {
          (e.NotAPlayer = 'Non sono un giocatore'),
            (e.GoalKeeper = 'Portiere'),
            (e.Master = 'Master'),
            (e.Striker = 'Attaccante');
        })(n || (n = {}));
    },
    144: function (e, t) {},
    145: function (e, t) {},
    146: function (e, t, r) {
      'use strict';
      var n;
      r.d(t, 'a', function () {
        return n;
      }),
        (function (e) {
          (e.New = 'new'), (e.PairsSelection = 'pairsSelection'), (e.Stage1 = 'stage1'), (e.Stage2 = 'stage2');
        })(n || (n = {}));
    },
    147: function (e, t, r) {
      'use strict';
      var n;
      r.d(t, 'a', function () {
        return n;
      }),
        (function (e) {
          (e.Admin = 'Admin'), (e.User = 'User');
        })(n || (n = {}));
    },
    148: function (e, t, r) {
      'use strict';
      function n(e) {
        if (null === e) return null;
        switch (parseInt(e)) {
          case 3:
            return 0;
          case 2:
            return 1;
          case 1:
            return 2;
          case 0:
            return 3;
          default:
            return null;
        }
      }
      function a(e, t) {
        return e.total === t.total
          ? 3 === e['col'.concat(t.rowNumber)] || 2 === e['col'.concat(t.rowNumber)]
            ? -1
            : 1
          : t.total - e.total;
      }
      r.d(t, 'b', function () {
        return n;
      }),
        r.d(t, 'a', function () {
          return a;
        }),
        r.d(t, 'c', function () {
          return c;
        });
      var c = function (e) {
        return e.map(function (t, r) {
          for (
            var n = {
                id: 'row-'.concat(t.tId, '-').concat(r),
                rowNumber: r + 1,
                pair: t,
                total: 0,
                placement: t.placement || 0,
              },
              a = 1;
            a <= e.length;
            a++
          )
            n['col'.concat(a)] = null;
          return n;
        });
      };
    },
    160: function (e, t, r) {
      e.exports = r.p + 'static/media/header.7774471e.jpg';
    },
    17: function (e, t, r) {
      'use strict';
      r.d(t, 'c', function () {
        return s;
      }),
        r.d(t, 'd', function () {
          return u;
        }),
        r.d(t, 'b', function () {
          return i;
        }),
        r.d(t, 'a', function () {
          return l;
        });
      var n = r(4),
        a = r(19),
        c = r(70),
        o = r(33),
        s = function (e, t) {
          throw (console.error(''.concat(t), e), a.b.error(t), new Error('Something went wrong : '.concat(t)));
        },
        u = function (e, t) {
          console.group('An error occur : '),
            console.error('Error', e),
            console.error('Details : ', Object(n.a)({}, t)),
            console.groupEnd(),
            a.b.error('Whoooops...Something went wrong...');
        },
        i = {
          code: o.a.InternalServerError,
          message: 'Unexpected Server Error',
          userMessage: {
            type: c.a.Danger,
            message: "Errore server non previsto. E' stata avviata la procedura di autodistruzione.",
          },
        },
        l = { headers: { 'Content-Type': 'application/json' } };
    },
    18: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return o;
      });
      var n = r(14),
        a = r(16),
        c = r(20),
        o = {
          registration: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Session]', 'Register User')))(),
          login: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Session]', 'Login User')))(),
          logout: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Session]', 'Logout User')))(),
          delete: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Session]', 'Delete User')))(),
          update: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Session]', 'Update User')))(),
          checkAuthentication: a.createAsyncAction.apply(
            void 0,
            Object(n.a)(Object(c.b)('[Session]', 'Check User Authentication'))
          )(),
          sessionControl: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Session]', 'Session Watcher')))(),
          updateSession: a.createAction.apply(void 0, Object(n.a)(Object(c.c)('[Session]', 'Set Session')))(),
          purge: Object(a.createAction)(c.a)(),
        };
    },
    183: function (e, t, r) {
      e.exports = r(264);
    },
    188: function (e, t, r) {},
    20: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return n;
      }),
        r.d(t, 'b', function () {
          return a;
        }),
        r.d(t, 'c', function () {
          return c;
        });
      var n = 'persist/PURGE',
        a = function (e, t) {
          return [
            ''.concat(e, ' ').concat(t, ' ').concat('Request'),
            ''.concat(e, ' ').concat(t, ' ').concat('Success'),
            ''.concat(e, ' ').concat(t, ' ').concat('Failure'),
          ];
        },
        c = function (e, t) {
          return [''.concat(e, ' ').concat(t)];
        };
    },
    203: function (e, t, r) {},
    204: function (e, t, r) {},
    206: function (e, t, r) {},
    26: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return o;
      });
      var n = r(14),
        a = r(16),
        c = r(20),
        o = {
          fetch: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Tournament]', 'Fetch Tournaments')))(),
          setTournament: a.createAction.apply(void 0, Object(n.a)(Object(c.c)('[Tournament]', 'Set Tournament')))(),
          save: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Tournament]', 'Save Tournament')))(),
          update: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Tournament]', 'Update Tournament')))(),
          purge: Object(a.createAction)(c.a)(),
        };
    },
    264: function (e, t, r) {
      'use strict';
      r.r(t);
      var n = r(0),
        a = r.n(n),
        c = r(30),
        o = r.n(c),
        s = (r(188), r(189), r(190), r(19));
      Boolean(
        'localhost' === window.location.hostname ||
          '[::1]' === window.location.hostname ||
          window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
      );
      var u = r(172),
        i = r(118),
        l = r(158),
        d = r(7),
        p = r.n(d),
        f = r(14),
        b = r(55),
        g = r(35),
        m = r(6),
        v = r(115),
        h = r(129),
        O = r.n(h),
        j = r(4),
        y = r(16),
        x = r(26),
        w = { tournament: null, tournamentsList: [], isLoading: !1 },
        E = Object(y.createReducer)(w)
          .handleAction([x.a.fetch.request, x.a.save.request, x.a.update.request], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !0 });
          })
          .handleAction([x.a.fetch.failure, x.a.save.failure, x.a.update.failure], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !1 });
          })
          .handleAction(x.a.fetch.success, function (e, t) {
            var r = t.payload.results;
            return { tournament: r && r.length > 0 ? r[0] : null, tournamentsList: r, isLoading: !1 };
          })
          .handleAction(x.a.setTournament, function (e, t) {
            var r = t.payload;
            return Object(j.a)(Object(j.a)({}, e), {}, { tournament: r, isLoading: !1 });
          })
          .handleAction([x.a.save.success, x.a.update.success], function (e, t) {
            var r = t.payload.tournament;
            return Object(j.a)(Object(j.a)({}, e), {}, { tournament: r, isLoading: !1 });
          })
          .handleAction(x.a.purge, function () {
            return w;
          }),
        S = r(28),
        P = { isLoading: !1, isSaving: !1, playersList: [] },
        A = Object(y.createReducer)(P)
          .handleAction([S.a.fetchPlayers.request], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !0, errorMessage: void 0 });
          })
          .handleAction([S.a.savePlayer.request, S.a.deletePlayers.request], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !0, isSaving: !0, errorMessage: void 0 });
          })
          .handleAction([S.a.fetchPlayers.failure, S.a.savePlayer.failure], function (e, t) {
            var r = t.payload.message;
            return Object(j.a)(Object(j.a)({}, e), {}, { errorMessage: r, isLoading: !1 });
          })
          .handleAction([S.a.savePlayer.success], function (e, t) {
            return { playersList: [t.payload.player].concat(Object(f.a)(e.playersList)), isLoading: !1, isSaving: !1 };
          })
          .handleAction([S.a.deletePlayers.success], function (e, t) {
            var r = t.payload.players;
            return {
              playersList: e.playersList.filter(function (e) {
                return !r.find(function (t) {
                  return t.id === e.id;
                });
              }),
              isLoading: !1,
              isSaving: !1,
            };
          })
          .handleAction(S.a.fetchPlayers.success, function (e, t) {
            return {
              playersList: t.payload.results.map(function (e, t) {
                return Object(j.a)(Object(j.a)({}, e), {}, { rowNumber: t + 1 });
              }),
              isLoading: !1,
              isSaving: !1,
            };
          })
          .handleAction(S.a.purge, function () {
            return P;
          }),
        k = r(12),
        N = { isLoading: !1 },
        T = Object(y.createReducer)(N)
          .handleAction([k.a.fetch.request], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !0, errorMessage: void 0 });
          })
          .handleAction([k.a.fetch.failure], function (e, t) {
            var r = t.payload.message;
            return Object(j.a)(Object(j.a)({}, e), {}, { errorMessage: r, isLoading: !1 });
          })
          .handleAction(k.a.fetch.success, function (e, t) {
            var r = t.payload.results;
            return Object(j.a)(Object(j.a)({}, e), {}, { pairList: r, isLoading: !1 });
          })
          .handleAction(k.a.purge, function () {
            return N;
          }),
        L = r(18),
        R = r(27),
        q = { isAuthenticated: !1, isAdmin: !1, isLoading: !0 },
        C = Object(y.createReducer)(q)
          .handleAction(
            [
              L.a.checkAuthentication.request,
              L.a.login.request,
              L.a.logout.request,
              L.a.update.request,
              L.a.delete.request,
            ],
            function (e) {
              return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !0 });
            }
          )
          .handleAction(
            [
              L.a.checkAuthentication.failure,
              L.a.login.failure,
              L.a.logout.failure,
              L.a.update.failure,
              L.a.delete.failure,
            ],
            function (e, t) {
              var r = t.payload.userMessage;
              return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !1, message: r });
            }
          )
          .handleAction(
            [
              L.a.checkAuthentication.success,
              L.a.registration.success,
              L.a.login.success,
              L.a.logout.success,
              L.a.update.success,
              L.a.delete.success,
              L.a.updateSession,
            ],
            function (e, t) {
              var r = t.payload.user;
              return { user: r, isAuthenticated: !!r, isAdmin: !!r && r.role === R.UserRole.Admin, isLoading: !1 };
            }
          )
          .handleAction(L.a.purge, function () {
            return q;
          }),
        z = r(96),
        M = { needRefresh: !1, selectedPairs: [Object(z.c)('-')], isLoading: !1, stages: [] },
        U = Object(y.createReducer)(M)
          .handleAction([k.d.stage1Watcher.request], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { needRefresh: !1 });
          })
          .handleAction([k.d.stage1Watcher.failure], function (e) {
            return Object(j.a)({}, e);
          })
          .handleAction([k.d.stage1Watcher.success], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { needRefresh: !0 });
          })
          .handleAction([k.d.fetchStage1.request, k.d.updateSelectedPairs.request], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !0 });
          })
          .handleAction([k.d.fetchStage1.failure, k.d.updateSelectedPairs.failure], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !1 });
          })
          .handleAction([k.d.updateCellStage1.success, k.d.updatePlacement.success], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !1 });
          })
          .handleAction([k.d.fetchStage1.success], function (e, t) {
            var r = t.payload,
              n = r.stageName,
              a = r.rows,
              c = r.pairsList,
              o = e.stages.filter(function (e) {
                return e.stageName === n;
              }),
              s =
                o && o.length > 0
                  ? Object(j.a)(Object(j.a)({}, o[0]), {}, { rows: a })
                  : { pairsList: c, stageName: n, rows: a, autoOrder: !1, isLoading: !1 };
            return Object(j.a)(
              Object(j.a)({}, e),
              {},
              {
                stages: [].concat(
                  Object(f.a)(
                    e.stages.filter(function (e) {
                      return e.stageName !== n;
                    })
                  ),
                  [s]
                ),
                isLoading: !1,
              }
            );
          })
          .handleAction([k.d.updateSelectedPairs.success], function (e, t) {
            var r = t.payload,
              n = r.stageName,
              a = r.rows,
              c = e.selectedRows ? e.selectedRows : new Map();
            c.set(n, a);
            var o = e.selectedPairs
              ? [].concat(
                  Object(f.a)(
                    e.selectedPairs.filter(function (e) {
                      return null === e.id || e.stage1Name !== n;
                    })
                  ),
                  Object(f.a)(
                    a.map(function (e) {
                      return e.pair;
                    })
                  )
                )
              : Object(f.a)(
                  a.map(function (e) {
                    return e.pair;
                  })
                );
            return Object(j.a)(Object(j.a)({}, e), {}, { selectedRows: c, selectedPairs: o, isLoading: !1 });
          })
          .handleAction(k.d.purge, function () {
            return M;
          }),
        I = { isLoading: !1 },
        D = Object(y.createReducer)(I)
          .handleAction([k.e.fetchStage2.request, k.e.delete.request], function (e) {
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: !0 });
          })
          .handleAction([k.e.fetchStage2.failure], function (e, t) {
            var r = t.payload.message;
            return Object(j.a)(Object(j.a)({}, e), {}, { errorMessage: r, isLoading: !1 });
          })
          .handleAction([k.e.fetchStage2.success], function (e, t) {
            var r = t.payload;
            return { cells: r.cells, rowsNumber: r.rowsNumber, isLoading: !1 };
          })
          .handleAction([k.e.delete.success], function () {
            return { cells: void 0, rowsNumber: 0, isLoading: !1 };
          })
          .handleAction([k.e.setCells], function (e, t) {
            var r = t.payload;
            return Object(j.a)(Object(j.a)({}, e), {}, { cells: r });
          })
          .handleAction([k.e.setLoading], function (e, t) {
            var r = t.payload;
            return Object(j.a)(Object(j.a)({}, e), {}, { isLoading: r });
          })
          .handleAction(k.e.purge, function () {
            return I;
          }),
        F = r(22),
        G = r(17),
        K = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          fetch(
                            (null === t || void 0 === t ? void 0 : t.tId)
                              ? '/api/v1/tournament/'.concat(t.tId)
                              : '/api/v1/tournament/list',
                            Object(j.a)({ method: 'GET' }, G.a)
                          )
                        );
                      case 3:
                        return (r = e.sent), (e.next = 6), r.json();
                      case 6:
                        return (n = e.sent), e.abrupt('return', { results: n });
                      case 10:
                        return (
                          (e.prev = 10),
                          (e.t0 = e.catch(0)),
                          Object(G.c)(e.t0, 'Error fetching Tournaments'),
                          e.abrupt('return', { results: [] })
                        );
                      case 14:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 10]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        J = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.model),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/tournament',
                            Object(j.a)(Object(j.a)({ method: 'POST' }, G.a), {}, { body: JSON.stringify(r) })
                          )
                        );
                      case 4:
                        return (n = e.sent), (e.next = 7), n.json();
                      case 7:
                        return e.abrupt('return', e.sent);
                      case 10:
                        return (
                          (e.prev = 10), (e.t0 = e.catch(1)), e.abrupt('return', Object(j.a)({ tournament: null }, G.b))
                        );
                      case 13:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 10]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        H = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.model),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/tournament',
                            Object(j.a)(Object(j.a)({ method: 'PUT' }, G.a), {}, { body: JSON.stringify(r) })
                          )
                        );
                      case 4:
                        return (n = e.sent), (e.next = 7), n.json();
                      case 7:
                        return e.abrupt('return', e.sent);
                      case 10:
                        return (
                          (e.prev = 10), (e.t0 = e.catch(1)), e.abrupt('return', Object(j.a)({ tournament: r }, G.b))
                        );
                      case 13:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 10]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        B = r(33),
        Z = p.a.mark(V),
        W = p.a.mark(X),
        _ = p.a.mark(Y);
      function V(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(K, e.payload);
                case 3:
                  return (t = r.sent), (r.next = 6), Object(m.e)(x.a.fetch.success(t));
                case 6:
                  r.next = 12;
                  break;
                case 8:
                  return (r.prev = 8), (r.t0 = r.catch(0)), (r.next = 12), Object(m.e)(x.a.fetch.failure(r.t0));
                case 12:
                case 'end':
                  return r.stop();
              }
          },
          Z,
          null,
          [[0, 8]]
        );
      }
      function X(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(J, e.payload);
                case 3:
                  if ((t = r.sent).code !== B.a.OK) {
                    r.next = 11;
                    break;
                  }
                  return (r.next = 7), Object(m.e)(x.a.save.success(t));
                case 7:
                  e.payload.history.push('/tournament'), s.b.success(t.userMessage.message), (r.next = 14);
                  break;
                case 11:
                  return s.b.error(t.userMessage.message), (r.next = 14), Object(m.e)(x.a.save.failure(t));
                case 14:
                  r.next = 20;
                  break;
                case 16:
                  return (r.prev = 16), (r.t0 = r.catch(0)), (r.next = 20), Object(m.e)(x.a.save.failure(G.b));
                case 20:
                case 'end':
                  return r.stop();
              }
          },
          W,
          null,
          [[0, 16]]
        );
      }
      function Y(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(H, e.payload);
                case 3:
                  if ((t = r.sent).code !== B.a.OK) {
                    r.next = 10;
                    break;
                  }
                  return (r.next = 7), Object(m.e)(x.a.update.success(t));
                case 7:
                  s.b.success(t.userMessage.message), (r.next = 13);
                  break;
                case 10:
                  return s.b.error(t.userMessage.message), (r.next = 13), Object(m.e)(x.a.update.failure(t));
                case 13:
                  r.next = 19;
                  break;
                case 15:
                  return (r.prev = 15), (r.t0 = r.catch(0)), (r.next = 19), Object(m.e)(x.a.update.failure(G.b));
                case 19:
                case 'end':
                  return r.stop();
              }
          },
          _,
          null,
          [[0, 15]]
        );
      }
      var $ = [Object(m.h)(x.a.fetch.request, V), Object(m.h)(x.a.save.request, X), Object(m.h)(x.a.update.request, Y)],
        Q = r(61),
        ee = p.a.mark(ne),
        te = p.a.mark(ae),
        re = p.a.mark(ce);
      function ne(e) {
        var t, r;
        return p.a.wrap(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  return (n.prev = 0), console.log('getPlayersSaga'), (n.next = 4), Object(m.b)(Q.b, e.payload);
                case 4:
                  return (
                    (t = n.sent),
                    (r = t.results),
                    console.log('getPlayersSaga: ', r),
                    (n.next = 9),
                    Object(m.e)(S.a.fetchPlayers.success({ results: r }))
                  );
                case 9:
                  n.next = 15;
                  break;
                case 11:
                  return (n.prev = 11), (n.t0 = n.catch(0)), (n.next = 15), Object(m.e)(S.a.fetchPlayers.failure(n.t0));
                case 15:
                case 'end':
                  return n.stop();
              }
          },
          ee,
          null,
          [[0, 11]]
        );
      }
      function ae(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(Q.a, e.payload);
                case 3:
                  return (t = r.sent), (r.next = 6), Object(m.e)(S.a.deletePlayers.success(t));
                case 6:
                  s.b.success('Giocatore eliminato...'), (r.next = 14);
                  break;
                case 9:
                  return (r.prev = 9), (r.t0 = r.catch(0)), (r.next = 13), Object(m.e)(S.a.deletePlayers.failure(r.t0));
                case 13:
                  s.b.error('Errore...');
                case 14:
                case 'end':
                  return r.stop();
              }
          },
          te,
          null,
          [[0, 9]]
        );
      }
      function ce(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(Q.d, e.payload);
                case 3:
                  return (t = r.sent), (r.next = 6), Object(m.e)(S.a.savePlayer.success(t));
                case 6:
                  s.b.success(null === e.payload.player.id ? 'Giocatore creato...' : 'Giocatore aggiornato...'),
                    (r.next = 13);
                  break;
                case 9:
                  return (r.prev = 9), (r.t0 = r.catch(0)), (r.next = 13), Object(m.e)(S.a.savePlayer.failure(r.t0));
                case 13:
                case 'end':
                  return r.stop();
              }
          },
          re,
          null,
          [[0, 9]]
        );
      }
      var oe = [
          Object(m.h)(S.a.fetchPlayers.request, ne),
          Object(m.h)(S.a.deletePlayers.request, ae),
          Object(m.h)(S.a.savePlayer.request, ce),
        ],
        se = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n, a;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.tId),
                          (e.prev = 1),
                          console.log('fetchPairs : ', r),
                          (e.next = 5),
                          fetch('/api/v1/pair/list/?tId='.concat(r), Object(j.a)({ method: 'GET' }, G.a))
                        );
                      case 5:
                        return (n = e.sent), (e.next = 8), n.json();
                      case 8:
                        return (a = e.sent), console.log('fetchPairs : ', r, a), e.abrupt('return', { results: a });
                      case 13:
                        return (
                          (e.prev = 13),
                          (e.t0 = e.catch(1)),
                          Object(G.c)(e.t0, 'Error pairs fetch'),
                          e.abrupt('return', { results: [] })
                        );
                      case 17:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 13]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ue = p.a.mark(ie);
      function ie(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(se, e.payload);
                case 3:
                  return (t = r.sent), (r.next = 6), Object(m.e)(k.a.fetch.success(t));
                case 6:
                  r.next = 12;
                  break;
                case 8:
                  return (r.prev = 8), (r.t0 = r.catch(0)), (r.next = 12), Object(m.e)(k.a.fetch.failure(r.t0));
                case 12:
                case 'end':
                  return r.stop();
              }
          },
          ue,
          null,
          [[0, 8]]
        );
      }
      var le,
        de = [Object(m.h)(k.a.fetch.request, ie)],
        pe = r(177),
        fe = r(70);
      !(function (e) {
        (e.SESSION_EXPIRED = 'session_expired'), (e.NEED_REFRESH = 'need_refresh');
      })(le || (le = {}));
      var be = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          fetch(
                            '/api/v1/auth/update',
                            Object(j.a)({ method: 'PUT', body: JSON.stringify(t.user) }, G.a)
                          )
                        );
                      case 3:
                        return (r = e.sent), (e.next = 6), r.json();
                      case 6:
                        return e.abrupt('return', e.sent);
                      case 9:
                        return (
                          (e.prev = 9), (e.t0 = e.catch(0)), e.abrupt('return', Object(j.a)({ user: void 0 }, G.b))
                        );
                      case 12:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 9]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ge = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          fetch('/api/v1/auth/', Object(j.a)({ method: 'DELETE', body: JSON.stringify(t) }, G.a))
                        );
                      case 3:
                        return (r = e.sent), (e.next = 6), r.json();
                      case 6:
                        return e.abrupt('return', e.sent);
                      case 9:
                        return (
                          (e.prev = 9), (e.t0 = e.catch(0)), e.abrupt('return', Object(j.a)({ user: void 0 }, G.b))
                        );
                      case 12:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 9]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        me = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n, a;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.username),
                          (n = t.password),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/auth/login',
                            Object(j.a)({ method: 'POST', body: JSON.stringify({ username: r, password: n }) }, G.a)
                          )
                        );
                      case 4:
                        return (a = e.sent), (e.next = 7), a.json();
                      case 7:
                        return e.abrupt('return', e.sent);
                      case 10:
                        return (
                          (e.prev = 10), (e.t0 = e.catch(1)), e.abrupt('return', Object(j.a)({ user: void 0 }, G.b))
                        );
                      case 13:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 10]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        ve = (function () {
          var e = Object(F.a)(
            p.a.mark(function e() {
              var t;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.prev = 0), (e.next = 3), fetch('/api/v1/auth/logout');
                      case 3:
                        return (t = e.sent), (e.next = 6), t.json();
                      case 6:
                        return e.abrupt('return', e.sent);
                      case 9:
                        return (
                          (e.prev = 9), (e.t0 = e.catch(0)), e.abrupt('return', Object(j.a)({ user: void 0 }, G.b))
                        );
                      case 12:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 9]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        he = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          t.history,
                          (r = Object(pe.a)(t, ['history'])),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch('/api/v1/auth/register', Object(j.a)({ method: 'POST', body: JSON.stringify(r) }, G.a))
                        );
                      case 4:
                        return (n = e.sent), (e.next = 7), n.json();
                      case 7:
                        return e.abrupt('return', e.sent);
                      case 10:
                        return (
                          (e.prev = 10), (e.t0 = e.catch(1)), e.abrupt('return', Object(j.a)({ user: void 0 }, G.b))
                        );
                      case 13:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 10]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        Oe = (function () {
          var e = Object(F.a)(
            p.a.mark(function e() {
              var t, r, n;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.prev = 0), (e.next = 3), fetch('/api/v1/auth/');
                      case 3:
                        return (t = e.sent), (e.next = 6), t.json();
                      case 6:
                        return e.abrupt('return', e.sent);
                      case 9:
                        if (
                          ((e.prev = 9),
                          (e.t0 = e.catch(0)),
                          (null === (r = t) || void 0 === r ? void 0 : r.status) !== B.a.Unauthorized)
                        ) {
                          e.next = 13;
                          break;
                        }
                        return e.abrupt('return', {
                          user: void 0,
                          code: B.a.OK,
                          message: '',
                          userMessage: { type: fe.a.Success, message: '' },
                        });
                      case 13:
                        return (n = Object(j.a)({ user: void 0 }, G.b)), Object(G.d)(e.t0, n), e.abrupt('return', n);
                      case 16:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 9]]
              );
            })
          );
          return function () {
            return e.apply(this, arguments);
          };
        })(),
        je = function (e) {
          return Object(b.d)(function (t) {
            var r = function (e) {
                return console.log('Connected...');
              },
              n = function (e) {
                if (e) {
                  var r = JSON.parse(e.data);
                  r.status === le.SESSION_EXPIRED && (t(r), c());
                }
              },
              a = function (e) {
                console.error('An Error Occur: ', e), t(b.a), c();
              };
            e.addEventListener('open', r), e.addEventListener('message', n), e.addEventListener('error', a);
            var c = function () {
              e.removeEventListener('open', r),
                e.removeEventListener('message', n),
                e.removeEventListener('error', a),
                e.close();
            };
            return c;
          }, b.b.expanding());
        },
        ye = r(148),
        xe = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n, a, c, o;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.pairsList),
                          (n = t.stageName),
                          (e.prev = 1),
                          (a = Object(ye.c)(r)),
                          (e.next = 5),
                          fetch(
                            '/api/v1/stage1',
                            Object(j.a)(
                              Object(j.a)({ method: 'POST' }, G.a),
                              {},
                              { body: JSON.stringify({ rows: a, stageName: n }) }
                            )
                          )
                        );
                      case 5:
                        return (c = e.sent), (e.next = 8), c.json();
                      case 8:
                        return (o = e.sent), e.abrupt('return', { pairsList: r, stageName: n, rows: o });
                      case 12:
                        return (
                          (e.prev = 12),
                          (e.t0 = e.catch(1)),
                          Object(G.c)(e.t0, 'Error stage1 fetch'),
                          e.abrupt('return', { pairsList: r, stageName: n, rows: [] })
                        );
                      case 16:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 12]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        we = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.rows),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/stage1/placement',
                            Object(j.a)(Object(j.a)({ method: 'POST' }, G.a), {}, { body: JSON.stringify({ rows: r }) })
                          )
                        );
                      case 4:
                        return (n = e.sent), (e.next = 7), n.json();
                      case 7:
                        e.next = 12;
                        break;
                      case 9:
                        (e.prev = 9), (e.t0 = e.catch(1)), Object(G.c)(e.t0, 'Error stage1 update placement');
                      case 12:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 9]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        Ee = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r, n, a;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.rows),
                          (n = t.stageName),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/pair/selected',
                            Object(j.a)(
                              Object(j.a)({ method: 'PUT' }, G.a),
                              {},
                              {
                                body: JSON.stringify({
                                  pairs: r.map(function (e) {
                                    return e.pair;
                                  }),
                                  stage1Name: n,
                                }),
                              }
                            )
                          )
                        );
                      case 4:
                        return (a = e.sent), (e.next = 7), a.json();
                      case 7:
                        e.next = 12;
                        break;
                      case 9:
                        (e.prev = 9), (e.t0 = e.catch(1)), Object(G.c)(e.t0, 'Error stage1 update selections');
                      case 12:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 9]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        Se = (function () {
          var e = Object(F.a)(
            p.a.mark(function e(t) {
              var r;
              return p.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          fetch(
                            '/api/v1/stage1/cell',
                            Object(j.a)(Object(j.a)({ method: 'POST' }, G.a), {}, { body: JSON.stringify(t) })
                          )
                        );
                      case 3:
                        return (r = e.sent), (e.next = 6), r.json();
                      case 6:
                        return e.abrupt('return', {});
                      case 9:
                        return (
                          (e.prev = 9),
                          (e.t0 = e.catch(0)),
                          Object(G.c)(e.t0, 'Error stage1 update cell'),
                          e.abrupt('return', {})
                        );
                      case 13:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 9]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        Pe = function (e) {
          return Object(b.d)(function (t) {
            var r = function (e) {
                return console.log('Stage1 Channel is now open.');
              },
              n = function (e) {
                if (e) {
                  var r = JSON.parse(e.data);
                  r.status === le.NEED_REFRESH && (t(r), c());
                }
              },
              a = function (e) {
                console.error('An Error Occur: ', e), t(b.a), c();
              };
            e.addEventListener('open', r), e.addEventListener('message', n), e.addEventListener('error', a);
            var c = function () {
              e.removeEventListener('open', r),
                e.removeEventListener('message', n),
                e.removeEventListener('error', a),
                e.close();
            };
            return c;
          }, b.b.expanding());
        },
        Ae = p.a.mark(Re),
        ke = p.a.mark(qe),
        Ne = p.a.mark(Ce),
        Te = p.a.mark(ze),
        Le = p.a.mark(Me);
      function Re(e) {
        var t, r, n;
        return p.a.wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.prev = 0),
                    console.log('watchStage1Saga : start'),
                    (t = new EventSource('/sse/v1/session')),
                    (e.next = 5),
                    Object(m.b)(Pe, t)
                  );
                case 5:
                  r = e.sent;
                case 6:
                  return (e.next = 9), Object(m.g)(r);
                case 9:
                  (n = e.sent), console.log('watchStage1Saga.message : ', n), (e.next = 6);
                  break;
                case 13:
                  e.next = 18;
                  break;
                case 15:
                  (e.prev = 15), (e.t0 = e.catch(0)), console.log('watchStage1Saga.err : ', e.t0);
                case 18:
                case 'end':
                  return e.stop();
              }
          },
          Ae,
          null,
          [[0, 15]]
        );
      }
      function qe(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(xe, e.payload);
                case 3:
                  return (t = r.sent), (r.next = 6), Object(m.e)(k.d.fetchStage1.success(t));
                case 6:
                  r.next = 13;
                  break;
                case 8:
                  return (r.prev = 8), (r.t0 = r.catch(0)), (r.next = 12), Object(m.e)(k.d.fetchStage1.failure(r.t0));
                case 12:
                  s.b.error('Error while fetching Stage2');
                case 13:
                case 'end':
                  return r.stop();
              }
          },
          ke,
          null,
          [[0, 8]]
        );
      }
      function Ce(e) {
        return p.a.wrap(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (t.prev = 0), (t.next = 3), Object(m.d)(Se, e.payload);
                case 3:
                  return (t.next = 5), Object(m.e)(k.d.updateCellStage1.success({}));
                case 5:
                  t.next = 12;
                  break;
                case 7:
                  return (
                    (t.prev = 7), (t.t0 = t.catch(0)), (t.next = 11), Object(m.e)(k.d.updateCellStage1.failure(t.t0))
                  );
                case 11:
                  s.b.error('Error while fetching Stage2');
                case 12:
                case 'end':
                  return t.stop();
              }
          },
          Ne,
          null,
          [[0, 7]]
        );
      }
      function ze(e) {
        return p.a.wrap(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (t.prev = 0), (t.next = 3), Object(m.d)(we, e.payload);
                case 3:
                  return (t.next = 5), Object(m.e)(k.d.updatePlacement.success({}));
                case 5:
                  t.next = 12;
                  break;
                case 7:
                  return (
                    (t.prev = 7), (t.t0 = t.catch(0)), (t.next = 11), Object(m.e)(k.d.updatePlacement.failure(t.t0))
                  );
                case 11:
                  s.b.error('Error while fetching Stage2');
                case 12:
                case 'end':
                  return t.stop();
              }
          },
          Te,
          null,
          [[0, 7]]
        );
      }
      function Me(e) {
        return p.a.wrap(
          function (t) {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (t.prev = 0), (t.next = 3), Object(m.d)(Ee, e.payload);
                case 3:
                  return (t.next = 5), Object(m.e)(k.d.updateSelectedPairs.success(e.payload));
                case 5:
                  t.next = 13;
                  break;
                case 7:
                  return (
                    (t.prev = 7),
                    (t.t0 = t.catch(0)),
                    console.error('Error updating selected pairs : ', t.t0),
                    (t.next = 12),
                    Object(m.e)(k.d.updateSelectedPairs.success(e.payload))
                  );
                case 12:
                  s.b.error('Error updating selected pairs');
                case 13:
                case 'end':
                  return t.stop();
              }
          },
          Le,
          null,
          [[0, 7]]
        );
      }
      var Ue = [
          Object(m.i)(k.d.stage1Watcher.request, Re),
          Object(m.h)(k.d.fetchStage1.request, qe),
          Object(m.h)(k.d.updateCellStage1.request, Ce),
          Object(m.h)(k.d.updatePlacement.request, ze),
          Object(m.h)(k.d.updateSelectedPairs.request, Me),
        ],
        Ie = r(99),
        De = r(73),
        Fe = p.a.mark(Je),
        Ge = p.a.mark(He),
        Ke = p.a.mark(Be);
      function Je(e) {
        var t, r;
        return p.a.wrap(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  return (n.prev = 0), (n.next = 3), Object(m.b)(Ie.a, e.payload.tId);
                case 3:
                  return (t = n.sent), (n.next = 6), Object(m.e)(k.e.delete.success(t));
                case 6:
                  return (n.next = 8), Object(m.f)(De.f.getTournament);
                case 8:
                  return (
                    ((r = n.sent).progress = R.TournamentProgress.Stage1),
                    s.b.success('Fase 2 eiminata...'),
                    (n.next = 13),
                    Object(m.e)(k.f.update.request({ model: r }))
                  );
                case 13:
                  n.next = 20;
                  break;
                case 15:
                  return (n.prev = 15), (n.t0 = n.catch(0)), (n.next = 19), Object(m.e)(k.e.delete.failure(n.t0));
                case 19:
                  s.b.error('Error while deleting Stage2');
                case 20:
                case 'end':
                  return n.stop();
              }
          },
          Fe,
          null,
          [[0, 15]]
        );
      }
      function He(e) {
        var t;
        return p.a.wrap(
          function (r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.prev = 0), (r.next = 3), Object(m.b)(Ie.c, e.payload);
                case 3:
                  return (t = r.sent), (r.next = 6), Object(m.e)(k.e.fetchStage2.success(t));
                case 6:
                  r.next = 13;
                  break;
                case 8:
                  return (r.prev = 8), (r.t0 = r.catch(0)), (r.next = 12), Object(m.e)(k.e.fetchStage2.failure(r.t0));
                case 12:
                  s.b.error('Error while fetching Stage2');
                case 13:
                case 'end':
                  return r.stop();
              }
          },
          Ge,
          null,
          [[0, 8]]
        );
      }
      function Be(e) {
        var t, r, n;
        return p.a.wrap(
          function (a) {
            for (;;)
              switch ((a.prev = a.next)) {
                case 0:
                  return (
                    (t = e.payload), (r = t.cell1), (n = t.cell2), (a.prev = 1), (a.next = 4), Object(m.d)(Ie.d, r, n)
                  );
                case 4:
                  return (a.next = 6), Object(m.e)(k.e.updateCell.success({}));
                case 6:
                  a.next = 13;
                  break;
                case 8:
                  return (a.prev = 8), (a.t0 = a.catch(1)), (a.next = 12), Object(m.e)(k.e.updateCell.failure(a.t0));
                case 12:
                  s.b.error('Error while updating Stage2');
                case 13:
                case 'end':
                  return a.stop();
              }
          },
          Ke,
          null,
          [[1, 8]]
        );
      }
      var Ze = [
          Object(m.h)(k.e.fetchStage2.request, He),
          Object(m.h)(k.e.updateCell.request, Be),
          Object(m.h)(k.e.delete.request, Je),
        ],
        We = p.a.mark(et),
        _e = p.a.mark(tt),
        Ve = p.a.mark(rt),
        Xe = p.a.mark(nt),
        Ye = p.a.mark(at),
        $e = p.a.mark(ct),
        Qe = p.a.mark(ot);
      function et(e) {
        var t, r;
        return p.a.wrap(
          function (n) {
            for (;;)
              switch ((n.prev = n.next)) {
                case 0:
                  return (t = e.payload), (n.prev = 1), (n.next = 4), Object(m.b)(Oe);
                case 4:
                  if ((r = n.sent).code !== B.a.OK) {
                    n.next = 12;
                    break;
                  }
                  return (n.next = 8), Object(m.e)(L.a.checkAuthentication.success(r));
                case 8:
                  return (n.next = 10), Object(m.e)(L.a.sessionControl.request({ history: t.history }));
                case 10:
                  n.next = 14;
                  break;
                case 12:
                  return (
                    (n.next = 14),
                    Object(m.e)(
                      L.a.checkAuthentication.failure({ code: r.code, message: r.message, userMessage: r.userMessage })
                    )
                  );
                case 14:
                  n.next = 20;
                  break;
                case 16:
                  return (
                    (n.prev = 16),
                    (n.t0 = n.catch(1)),
                    (n.next = 20),
                    Object(m.e)(L.a.checkAuthentication.failure(n.t0))
                  );
                case 20:
                case 'end':
                  return n.stop();
              }
          },
          We,
          null,
          [[1, 16]]
        );
      }
      function tt(e) {
        var t, r, n, a;
        return p.a.wrap(
          function (c) {
            for (;;)
              switch ((c.prev = c.next)) {
                case 0:
                  return (
                    (t = e.payload.history),
                    (c.prev = 1),
                    (r = new EventSource('/sse/v1/session')),
                    (c.next = 5),
                    Object(m.b)(je, r)
                  );
                case 5:
                  n = c.sent;
                case 6:
                  return (c.next = 9), Object(m.g)(n);
                case 9:
                  if (!(a = c.sent) || a.status !== le.SESSION_EXPIRED) {
                    c.next = 17;
                    break;
                  }
                  return (
                    s.b.error('La tua sessione \xe8 scaduta. Stai per essere reindirizzato alla login...'),
                    (c.next = 14),
                    Object(m.c)(3e3)
                  );
                case 14:
                  return (
                    (c.next = 16),
                    Object(m.e)(
                      L.a.logout.success({
                        user: void 0,
                        code: B.a.Unauthorized,
                        message: 'Unauthorized!',
                        userMessage: { message: 'Sessione scaduta...', type: fe.a.Danger },
                      })
                    )
                  );
                case 16:
                  t.push('/login');
                case 17:
                  c.next = 6;
                  break;
                case 19:
                  c.next = 24;
                  break;
                case 21:
                  (c.prev = 21), (c.t0 = c.catch(1)), console.log('watchSessionSaga.err : ', c.t0);
                case 24:
                case 'end':
                  return c.stop();
              }
          },
          _e,
          null,
          [[1, 21]]
        );
      }
      function rt(e) {
        var t;
        return p.a.wrap(function (r) {
          for (;;)
            switch ((r.prev = r.next)) {
              case 0:
                return (r.next = 2), Object(m.b)(ve);
              case 2:
                if ((t = r.sent).code !== B.a.OK) {
                  r.next = 10;
                  break;
                }
                return (r.next = 6), Object(m.e)(L.a.logout.success(t));
              case 6:
                e.payload.history.push('/'), s.b.success(t.userMessage.message), (r.next = 13);
                break;
              case 10:
                return s.b.error(t.userMessage.message), (r.next = 13), Object(m.e)(L.a.logout.failure(t));
              case 13:
                return (
                  ft.purge(),
                  (r.next = 16),
                  Object(m.e)(
                    L.a.logout.success({
                      code: B.a.OK,
                      message: 'Logout complete',
                      userMessage: { type: fe.a.Success, message: 'Logout ' },
                    })
                  )
                );
              case 16:
              case 'end':
                return r.stop();
            }
        }, Ve);
      }
      function nt(e) {
        var t, r;
        return p.a.wrap(function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                return (t = e.payload), (n.next = 3), Object(m.b)(me, t);
              case 3:
                if ((r = n.sent).code !== B.a.OK) {
                  n.next = 15;
                  break;
                }
                return (n.next = 7), Object(m.e)(L.a.login.success(r));
              case 7:
                return (n.next = 9), Object(m.e)(L.a.sessionControl.request({ history: t.history }));
              case 9:
                return (n.next = 11), Object(m.e)(k.f.fetch.request({}));
              case 11:
                t.history.push('/'), s.b.success(r.userMessage.message), (n.next = 18);
                break;
              case 15:
                return s.b.error(r.userMessage.message), (n.next = 18), Object(m.e)(L.a.login.failure(r));
              case 18:
              case 'end':
                return n.stop();
            }
        }, Xe);
      }
      function at(e) {
        var t, r;
        return p.a.wrap(function (n) {
          for (;;)
            switch ((n.prev = n.next)) {
              case 0:
                return (t = e.payload), (n.next = 3), Object(m.b)(he, t);
              case 3:
                if ((r = n.sent).code !== B.a.OK) {
                  n.next = 15;
                  break;
                }
                return (n.next = 7), Object(m.e)(L.a.registration.success(r));
              case 7:
                return (n.next = 9), Object(m.e)(L.a.sessionControl.request({ history: t.history }));
              case 9:
                return (n.next = 11), Object(m.e)(k.f.fetch.request({}));
              case 11:
                t.history.push('/'), s.b.success(r.userMessage.message), (n.next = 18);
                break;
              case 15:
                return (
                  r.errors &&
                    r.errors.forEach(function (e) {
                      return s.b.error(e);
                    }),
                  (n.next = 18),
                  Object(m.e)(L.a.registration.failure(r))
                );
              case 18:
              case 'end':
                return n.stop();
            }
        }, Ye);
      }
      function ct(e) {
        var t;
        return p.a.wrap(function (r) {
          for (;;)
            switch ((r.prev = r.next)) {
              case 0:
                return (r.next = 2), Object(m.b)(be, e.payload);
              case 2:
                if ((t = r.sent).code !== B.a.OK) {
                  r.next = 10;
                  break;
                }
                return (r.next = 6), Object(m.e)(L.a.update.success(t));
              case 6:
                e.payload.history.push('/'), s.b.success(t.userMessage.message), (r.next = 13);
                break;
              case 10:
                return s.b.error(t.userMessage.message), (r.next = 13), Object(m.e)(L.a.update.failure(t));
              case 13:
              case 'end':
                return r.stop();
            }
        }, $e);
      }
      function ot(e) {
        var t;
        return p.a.wrap(function (r) {
          for (;;)
            switch ((r.prev = r.next)) {
              case 0:
                return (r.next = 2), Object(m.b)(ge, e.payload);
              case 2:
                if ((t = r.sent).code !== B.a.OK) {
                  r.next = 11;
                  break;
                }
                return (r.next = 6), Object(m.e)(L.a.delete.success(t));
              case 6:
                return (r.next = 8), Object(m.e)(L.a.logout.request({ history: e.payload.history }));
              case 8:
                s.b.success(t.userMessage.message), (r.next = 14);
                break;
              case 11:
                return s.b.error(t.userMessage.message), (r.next = 14), Object(m.e)(L.a.delete.failure(t));
              case 14:
              case 'end':
                return r.stop();
            }
        }, Qe);
      }
      var st = [
          Object(m.h)(L.a.logout.request, rt),
          Object(m.h)(L.a.login.request, nt),
          Object(m.h)(L.a.update.request, ct),
          Object(m.h)(L.a.delete.request, ot),
          Object(m.h)(L.a.registration.request, at),
          Object(m.h)(L.a.checkAuthentication.request, et),
          Object(m.i)(L.a.sessionControl.request, tt),
          Object(m.h)('*', function (e) {
            0;
          }),
        ],
        ut =
          (R.PlayerRole.GoalKeeper,
          R.PlayerRole.GoalKeeper,
          new Date('2020-09-05T08:53:36.000Z'),
          R.TournamentProgress.New,
          new Date('2020-09-05T08:53:36.000Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.795Z'),
          R.TournamentProgress.Stage2,
          new Date('2020-08-26T13:43:08.789Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.785Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.780Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.776Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.770Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.766Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.759Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.750Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T13:43:08.703Z'),
          R.TournamentProgress.New,
          new Date('2020-08-20T08:49:50.000Z'),
          R.TournamentProgress.New,
          new Date('2020-08-26T14:00:27.743Z'),
          R.UserRole.Admin,
          R.PlayerRole.GoalKeeper,
          R.PlayerRole.GoalKeeper,
          p.a.mark(bt)),
        it = g.d,
        lt = Object(b.c)(),
        dt = { tournamentState: E, playerState: A, pairState: T, sessionState: C, stage1State: U, stage2State: D },
        pt = Object(g.e)(Object(v.a)({ key: 'app', storage: O.a }, Object(g.c)(dt)), it(Object(g.a)(lt))),
        ft = Object(v.b)(pt);
      function bt() {
        return p.a.wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  (e.next = 2),
                  Object(m.a)(
                    [].concat(
                      Object(f.a)($),
                      Object(f.a)(oe),
                      Object(f.a)(de),
                      Object(f.a)(st),
                      Object(f.a)(Ze),
                      Object(f.a)(Ue)
                    )
                  )
                );
              case 2:
              case 'end':
                return e.stop();
            }
        }, ut);
      }
      lt.run(bt);
      var gt = r(37),
        mt = r(60),
        vt = r(160),
        ht = r.n(vt),
        Ot = r(277),
        jt = r(282),
        yt = r(281),
        xt = r(280),
        wt = r(278),
        Et = r(104),
        St = r(50),
        Pt = Object(n.lazy)(function () {
          return Promise.all([r.e(187), r.e(195)]).then(r.bind(null, 1218));
        }),
        At = Object(n.lazy)(function () {
          return Promise.all([r.e(1), r.e(189), r.e(196)]).then(r.bind(null, 1414));
        }),
        kt = Object(n.lazy)(function () {
          return Promise.all([r.e(0), r.e(198)]).then(r.bind(null, 1413));
        }),
        Nt = Object(n.lazy)(function () {
          return Promise.all([r.e(0), r.e(1), r.e(192)]).then(r.bind(null, 1412));
        }),
        Tt = Object(n.lazy)(function () {
          return Promise.all([r.e(1), r.e(197)]).then(r.bind(null, 1411));
        }),
        Lt = Object(n.lazy)(function () {
          return Promise.all([r.e(0), r.e(190)]).then(r.bind(null, 1410));
        }),
        Rt = Object(n.lazy)(function () {
          return r.e(199).then(r.bind(null, 1219));
        }),
        qt = Object(n.lazy)(function () {
          return r.e(191).then(r.bind(null, 1220));
        }),
        Ct = Object(n.lazy)(function () {
          return Promise.resolve()
            .then(r.bind(null, 74))
            .then(function (e) {
              return { default: e.RedirectionControl };
            });
        }),
        zt = [
          {
            path: '/login',
            label: 'route.login',
            exact: !0,
            componentToRender: Rt,
            visible: !1,
            private: !1,
            index: 0,
          },
          { path: '/', label: 'route.home', exact: !0, componentToRender: kt, visible: !1, private: !0, index: 10 },
          {
            path: '/tournament',
            label: 'route.tournament',
            exact: !0,
            componentToRender: Nt,
            visible: !1,
            private: !0,
            index: 20,
          },
          {
            path: '/stage1',
            label: 'route.stage1',
            exact: !0,
            componentToRender: Tt,
            visible: !1,
            private: !0,
            index: 30,
          },
          {
            path: '/player',
            label: 'route.player',
            exact: !0,
            componentToRender: At,
            icon: St.i,
            visible: !0,
            private: !0,
            index: 40,
          },
          { path: '/user', label: 'route.user', exact: !0, componentToRender: qt, visible: !1, private: !0, index: 50 },
          {
            path: '/stage2',
            label: 'route.stage2',
            exact: !0,
            componentToRender: Lt,
            visible: !1,
            private: !0,
            index: 60,
          },
          {
            path: '/swagger',
            label: 'route.swagger',
            exact: !0,
            componentToRender: Pt,
            icon: St.d,
            visible: !0,
            private: !0,
            index: 70,
          },
          {
            path: '*',
            label: 'route.notFound',
            exact: !1,
            componentToRender: Ct,
            visible: !1,
            private: !0,
            index: 1e3,
          },
        ],
        Mt = zt;
      var Ut = r(24),
        It = r(68),
        Dt = r(116),
        Ft = r(94),
        Gt = r(174),
        Kt = r(162);
      Dt.a
        .use(Kt.a)
        .use(Gt.a)
        .use(Ft.e)
        .init({
          debug: !1,
          supportedLngs: ['it-IT', 'en-US'],
          fallbackLng: 'en-US',
          ns: ['common', 'auth', 'tournament', 'pair'],
          defaultNS: 'common',
          fallbackNS: ['common'],
          preload: ['it-IT'],
          load: 'currentOnly',
          interpolation: { escapeValue: !1 },
          backend: { loadPath: '/locales/{{lng}}/{{ns}}.json' },
        });
      var Jt = Dt.a,
        Ht = r(283),
        Bt = function () {
          var e = Object(gt.c)(),
            t = Object(Ut.g)(),
            r = Object(Ht.a)(['common']).t,
            n = Object(gt.d)(It.a.getSession),
            c = n.user,
            o = n.isAuthenticated,
            s = n.isAdmin,
            u = {
              backgroundImage: 'url('.concat(ht.a, ')'),
              backgroundSize: 'cover',
              padding: '60px 0px 10px 0px',
              minHeight: '28vh',
            },
            i = 'it-IT' === Dt.a.language ? 'en-US' : 'it-IT';
          return a.a.createElement(
            'header',
            null,
            a.a.createElement(
              Ot.a,
              { style: u },
              a.a.createElement(
                'h1',
                { style: { margin: '5vh' } },
                a.a.createElement('strong', { style: { color: 'white' } }, 'Calcetto C.S.M')
              ),
              o
                ? a.a.createElement(
                    jt.a,
                    { collapseOnSelect: !0, expand: 'lg', bg: 'dark', variant: 'dark' },
                    a.a.createElement(
                      jt.a.Brand,
                      { as: mt.b, to: '/' },
                      a.a.createElement('span', null, a.a.createElement(St.e, null), ' ', r('route.home'))
                    ),
                    a.a.createElement(jt.a.Toggle, { 'aria-controls': 'responsive-navbar-nav' }),
                    a.a.createElement(
                      jt.a.Collapse,
                      { id: 'responsive-navbar-nav' },
                      a.a.createElement(
                        yt.a,
                        { className: 'mr-auto' },
                        Mt.map(function (e) {
                          return !e.visible || ('/swagger' === e.path && !s)
                            ? null
                            : a.a.createElement(
                                yt.a.Link,
                                { as: mt.b, key: e.index, to: e.path, className: 'text-white' },
                                a.a.createElement(
                                  'span',
                                  null,
                                  e.icon ? a.a.createElement(e.icon, null) : null,
                                  ' ',
                                  r(e.label)
                                )
                              );
                        })
                      ),
                      c
                        ? a.a.createElement(
                            a.a.Fragment,
                            null,
                            a.a.createElement(
                              xt.a,
                              { alignRight: !0, as: wt.a },
                              a.a.createElement(
                                Et.a,
                                { style: { opacity: 1 }, variant: 'outline-warning', size: 'lg', disabled: !0 },
                                a.a.createElement(
                                  'strong',
                                  { style: { color: '#64bd9c', fontSize: 'larger' } },
                                  c.username,
                                  ' ',
                                  a.a.createElement(St.r, null)
                                )
                              ),
                              a.a.createElement(xt.a.Toggle, {
                                split: !0,
                                variant: 'outline-warning',
                                id: 'dropdown-custom-2',
                              }),
                              a.a.createElement(
                                xt.a.Menu,
                                { className: 'default-background default-border-yellow' },
                                a.a.createElement(
                                  xt.a.Item,
                                  {
                                    className: 'default-color-white default-hover-green',
                                    as: mt.b,
                                    to: '/user',
                                    eventKey: '1',
                                  },
                                  a.a.createElement('span', null, r('route.user'))
                                ),
                                a.a.createElement(
                                  xt.a.Item,
                                  {
                                    className: 'default-color-white default-hover-green',
                                    onClick: function () {
                                      return Jt.changeLanguage(i);
                                    },
                                    as: 'button',
                                    eventKey: '2',
                                  },
                                  a.a.createElement('span', null, a.a.createElement(St.f, null), ' ', r(i))
                                ),
                                a.a.createElement(xt.a.Divider, { style: { borderTopColor: '#ffc107' } }),
                                a.a.createElement(
                                  xt.a.Item,
                                  {
                                    className: 'default-color-white default-hover-green',
                                    as: 'button',
                                    onClick: function () {
                                      return e(k.c.logout.request({ history: t }));
                                    },
                                    eventKey: '3',
                                  },
                                  a.a.createElement(
                                    'span',
                                    null,
                                    a.a.createElement(St.h, null),
                                    ' ',
                                    a.a.createElement('strong', null, r('logout'), ' ')
                                  )
                                )
                              )
                            )
                          )
                        : null
                    )
                  )
                : null
            )
          );
        },
        Zt = r(74),
        Wt = function (e) {
          var t = Object(gt.d)(It.a.isAuthenticated),
            r = Object(gt.d)(It.a.getSession),
            a = Object(gt.d)(De.f.getTournament);
          return n.createElement(
            Ut.b,
            Object.assign({}, e, {
              render: function (c) {
                var o = c.location;
                return (
                  console.log('ProtectedRoute : ', r, a, o),
                  t && '/login' === o.pathname
                    ? (console.log('ProtectedRoute => redirect to Home'),
                      n.createElement(Ut.a, Object.assign({}, e, { to: { pathname: '/', state: { from: o } } })))
                    : e.private
                    ? t
                      ? (console.log(
                          'ProtectedRoute => render component : ',
                          (function (e) {
                            var t = zt.find(function (t) {
                              return t.path === e;
                            });
                            return t ? t.label : 'route '.concat(e, ' not found!');
                          })(o.pathname)
                        ),
                        n.createElement(e.componentToRender, e))
                      : (console.log('ProtectedRoute => redirect to Login : ', Object(j.a)({}, r)),
                        n.createElement(Ut.a, Object.assign({}, e, { to: { pathname: '/login', state: { from: o } } })))
                    : (console.log('ProtectedRoute => public route : ', Object(j.a)({}, e)),
                      n.createElement(e.componentToRender, e))
                );
              },
            })
          );
        },
        _t = (Object(gt.b)(Wt), r(167)),
        Vt = r(168),
        Xt = r(175),
        Yt = r(171),
        $t = (function (e) {
          Object(Xt.a)(r, e);
          var t = Object(Yt.a)(r);
          function r() {
            var e;
            Object(_t.a)(this, r);
            for (var n = arguments.length, a = new Array(n), c = 0; c < n; c++) a[c] = arguments[c];
            return ((e = t.call.apply(t, [this].concat(a))).state = { error: void 0, errorInfo: void 0 }), e;
          }
          return (
            Object(Vt.a)(r, [
              {
                key: 'componentDidCatch',
                value: function (e, t) {
                  this.setState({ error: e, errorInfo: t });
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.state,
                    t = (e.error, e.errorInfo),
                    r = this.props.children;
                  if (t) {
                    return a.a.createElement(
                      'div',
                      null,
                      a.a.createElement('h2', { className: 'error' }, 'An unexpected error has occurred.'),
                      void 0
                    );
                  }
                  return r;
                },
              },
            ]),
            r
          );
        })(a.a.Component),
        Qt = (r(204), r(269)),
        er = (r(205), r(206), r(279)),
        tr = function () {
          return a.a.createElement(
            'h4',
            { style: { position: 'absolute', top: '0.1em', right: '0.1em' } },
            a.a.createElement(
              er.a,
              { variant: 'info' },
              a.a.createElement('span', null, 'v.'),
              a.a.createElement('strong', null, '2.7.0'),
              a.a.createElement(
                'span',
                null,
                a.a.createElement('i', null, a.a.createElement('small', null, ' @ ', '945f35c'))
              )
            )
          );
        };
      Object(St.s)();
      var rr = function (e) {
          var t = Object(gt.c)(),
            r = Object(Ut.g)(),
            c = Object(gt.d)(De.c.isLoading);
          return (
            Object(n.useEffect)(
              function () {
                t(k.c.checkAuthentication.request({ history: r }));
              },
              [r, t]
            ),
            a.a.createElement(
              'div',
              { className: 'App' },
              a.a.createElement(
                $t,
                null,
                a.a.createElement(
                  n.Suspense,
                  { fallback: a.a.createElement(Zt.LoadingModal, null) },
                  a.a.createElement(Bt, null)
                ),
                a.a.createElement(
                  Qt.a,
                  { fluid: !0, style: { marginBottom: '20vh' } },
                  a.a.createElement(s.a, { autoClose: 2e3 }),
                  c
                    ? a.a.createElement(Zt.LoadingModal, null)
                    : a.a.createElement(
                        n.Suspense,
                        { fallback: a.a.createElement(Zt.LoadingModal, null) },
                        a.a.createElement(
                          Ut.d,
                          null,
                          Mt.map(function (e) {
                            return a.a.createElement(Wt, Object.assign({}, e, { key: e.index }));
                          })
                        )
                      ),
                  a.a.createElement(tr, null)
                )
              )
            )
          );
        },
        nr = function () {
          return a.a.createElement(
            gt.a,
            { store: pt },
            a.a.createElement(
              l.a,
              { loading: a.a.createElement(Zt.LoadingModal, { show: !0 }), persistor: ft },
              a.a.createElement(mt.a, null, a.a.createElement(rr, null))
            )
          );
        },
        ar = function () {
          return a.a.createElement(nr, null);
        };
      Object(i.setDefaultLocale)('it'),
        Object(i.registerLocale)('it', u.a),
        o.a.render(a.a.createElement(ar, null), document.getElementById('root')),
        'serviceWorker' in navigator &&
          navigator.serviceWorker.ready.then(function (e) {
            e.unregister();
          }),
        window.console || (window.console = {}),
        ['log', 'debug', 'warn', 'info'].forEach(function (e) {
          return (window.console[e] = function () {});
        });
    },
    27: function (e, t, r) {
      'use strict';
      var n = r(142);
      r.o(n, 'PlayerRole') &&
        r.d(t, 'PlayerRole', function () {
          return n.PlayerRole;
        }),
        r.o(n, 'TournamentProgress') &&
          r.d(t, 'TournamentProgress', function () {
            return n.TournamentProgress;
          }),
        r.o(n, 'UserRole') &&
          r.d(t, 'UserRole', function () {
            return n.UserRole;
          });
      var a = r(143);
      r.d(t, 'PlayerRole', function () {
        return a.a;
      });
      var c = r(144);
      r.o(c, 'TournamentProgress') &&
        r.d(t, 'TournamentProgress', function () {
          return c.TournamentProgress;
        }),
        r.o(c, 'UserRole') &&
          r.d(t, 'UserRole', function () {
            return c.UserRole;
          });
      var o = r(145);
      r.o(o, 'TournamentProgress') &&
        r.d(t, 'TournamentProgress', function () {
          return o.TournamentProgress;
        }),
        r.o(o, 'UserRole') &&
          r.d(t, 'UserRole', function () {
            return o.UserRole;
          });
      var s = r(146);
      r.d(t, 'TournamentProgress', function () {
        return s.a;
      });
      var u = r(147);
      r.d(t, 'UserRole', function () {
        return u.a;
      });
    },
    28: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return o;
      });
      var n = r(14),
        a = r(16),
        c = r(20),
        o = {
          fetchPlayers: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Player]', 'Fetch Palyers')))(),
          savePlayer: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Player]', 'Save Player')))(),
          deletePlayers: a.createAsyncAction.apply(void 0, Object(n.a)(Object(c.b)('[Player]', 'Delete Player')))(),
          purge: Object(a.createAction)(c.a)(),
        };
    },
    33: function (e, t, r) {
      'use strict';
      var n;
      r.d(t, 'a', function () {
        return n;
      }),
        (function (e) {
          (e[(e.Continue = 100)] = 'Continue'),
            (e[(e.SwitchingProtocols = 101)] = 'SwitchingProtocols'),
            (e[(e.Processing = 102)] = 'Processing'),
            (e[(e.EarlyHints = 103)] = 'EarlyHints'),
            (e[(e.InformationalResponses = 103)] = 'InformationalResponses'),
            (e[(e.OK = 200)] = 'OK'),
            (e[(e.Created = 201)] = 'Created'),
            (e[(e.Accepted = 202)] = 'Accepted'),
            (e[(e.NonAuthoritativeInformation = 203)] = 'NonAuthoritativeInformation'),
            (e[(e.NoContent = 204)] = 'NoContent'),
            (e[(e.ResetContent = 205)] = 'ResetContent'),
            (e[(e.PartialContent = 206)] = 'PartialContent'),
            (e[(e.MultiStatus = 207)] = 'MultiStatus'),
            (e[(e.AlreadyReported = 208)] = 'AlreadyReported'),
            (e[(e.IMUsed = 226)] = 'IMUsed'),
            (e[(e.Success = 255)] = 'Success'),
            (e[(e.MultipleChoices = 300)] = 'MultipleChoices'),
            (e[(e.MovedPermanently = 301)] = 'MovedPermanently'),
            (e[(e.Found = 302)] = 'Found'),
            (e[(e.SeeOther = 303)] = 'SeeOther'),
            (e[(e.NotModified = 304)] = 'NotModified'),
            (e[(e.UseProxy = 305)] = 'UseProxy'),
            (e[(e.SwitchProxy = 306)] = 'SwitchProxy'),
            (e[(e.TemporaryRedirect = 307)] = 'TemporaryRedirect'),
            (e[(e.PermanentRedirect = 308)] = 'PermanentRedirect'),
            (e[(e.Redirection = 319)] = 'Redirection'),
            (e[(e.BadRequest = 400)] = 'BadRequest'),
            (e[(e.Unauthorized = 401)] = 'Unauthorized'),
            (e[(e.PaymentRequired = 402)] = 'PaymentRequired'),
            (e[(e.Forbidden = 403)] = 'Forbidden'),
            (e[(e.NotFound = 404)] = 'NotFound'),
            (e[(e.MethodNotAllowed = 405)] = 'MethodNotAllowed'),
            (e[(e.NotAcceptable = 406)] = 'NotAcceptable'),
            (e[(e.ProxyAuthenticationRequired = 407)] = 'ProxyAuthenticationRequired'),
            (e[(e.RequestTimeout = 408)] = 'RequestTimeout'),
            (e[(e.Conflict = 409)] = 'Conflict'),
            (e[(e.Gone = 410)] = 'Gone'),
            (e[(e.LengthRequired = 411)] = 'LengthRequired'),
            (e[(e.PreconditionFailed = 412)] = 'PreconditionFailed'),
            (e[(e.PayloadTooLarge = 413)] = 'PayloadTooLarge'),
            (e[(e.URITooLong = 414)] = 'URITooLong'),
            (e[(e.UnsupportedMediaType = 415)] = 'UnsupportedMediaType'),
            (e[(e.RangeNotSatisfiable = 416)] = 'RangeNotSatisfiable'),
            (e[(e.ExpectationFailed = 417)] = 'ExpectationFailed'),
            (e[(e.ImATeapot = 418)] = 'ImATeapot'),
            (e[(e.MisdirectedRequest = 421)] = 'MisdirectedRequest'),
            (e[(e.UnprocessableEntity = 422)] = 'UnprocessableEntity'),
            (e[(e.Locked = 423)] = 'Locked'),
            (e[(e.FailedDependency = 424)] = 'FailedDependency'),
            (e[(e.UpgradeRequired = 426)] = 'UpgradeRequired'),
            (e[(e.PreconditionRequired = 428)] = 'PreconditionRequired'),
            (e[(e.TooManyRequests = 429)] = 'TooManyRequests'),
            (e[(e.RequestHeaderFieldsTooLarge = 431)] = 'RequestHeaderFieldsTooLarge'),
            (e[(e.UnavailableForLegalReasons = 451)] = 'UnavailableForLegalReasons'),
            (e[(e.ClientErrors = 511)] = 'ClientErrors'),
            (e[(e.InternalServerError = 500)] = 'InternalServerError'),
            (e[(e.NotImplemented = 501)] = 'NotImplemented'),
            (e[(e.BadGateway = 502)] = 'BadGateway'),
            (e[(e.ServiceUnavailable = 503)] = 'ServiceUnavailable'),
            (e[(e.GatewayTimeout = 504)] = 'GatewayTimeout'),
            (e[(e.HTTPVersionNotSupported = 505)] = 'HTTPVersionNotSupported'),
            (e[(e.VariantAlsoNegotiates = 506)] = 'VariantAlsoNegotiates'),
            (e[(e.InsufficientStorage = 507)] = 'InsufficientStorage'),
            (e[(e.LoopDetected = 508)] = 'LoopDetected'),
            (e[(e.NotExtended = 510)] = 'NotExtended'),
            (e[(e.NetworkAuthenticationRequired = 511)] = 'NetworkAuthenticationRequired'),
            (e[(e.ServerErrors = 511)] = 'ServerErrors');
        })(n || (n = {}));
    },
    50: function (e, t, r) {
      'use strict';
      r.d(t, 's', function () {
        return i;
      }),
        r.d(t, 'p', function () {
          return d;
        }),
        r.d(t, 'l', function () {
          return p;
        }),
        r.d(t, 'd', function () {
          return f;
        }),
        r.d(t, 'h', function () {
          return b;
        }),
        r.d(t, 'r', function () {
          return g;
        }),
        r.d(t, 'i', function () {
          return m;
        }),
        r.d(t, 'f', function () {
          return v;
        }),
        r.d(t, 'e', function () {
          return h;
        }),
        r.d(t, 'b', function () {
          return O;
        }),
        r.d(t, 'k', function () {
          return j;
        }),
        r.d(t, 'g', function () {
          return y;
        }),
        r.d(t, 'm', function () {
          return x;
        }),
        r.d(t, 'o', function () {
          return w;
        }),
        r.d(t, 'n', function () {
          return E;
        }),
        r.d(t, 'j', function () {
          return S;
        }),
        r.d(t, 'q', function () {
          return P;
        }),
        r.d(t, 'c', function () {
          return A;
        }),
        r.d(t, 'a', function () {
          return k;
        });
      var n = r(0),
        a = r.n(n),
        c = r(161),
        o = r(71),
        s = r(34),
        u = r(130),
        i = function () {
          o.c.add(u.b, u.a, s.k, s.p, s.i, s.h, s.g, s.e, s.c, s.b, s.l, s.m, s.n, s.j, s.o, s.a, s.d, s.f);
        },
        l = function (e) {
          var t = e.size,
            r = e.prefix,
            n = e.iconName,
            s = e.color;
          return a.a.createElement(c.a, { color: s, size: t, icon: Object(o.a)({ prefix: r, iconName: n }) });
        },
        d = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'far', iconName: 'trash-alt' });
        },
        p = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'far', iconName: 'save' });
        },
        f = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'file-medical-alt' });
        },
        b = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'sign-out-alt' });
        },
        g = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'user' });
        },
        m = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'male' });
        },
        v = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'language' });
        },
        h = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'home' });
        },
        O = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'broom' });
        },
        j = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'arrow-alt-circle-right' });
        },
        y = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'arrow-alt-circle-left' });
        },
        x = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'times' });
        },
        w = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'toggle-on' });
        },
        E = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'toggle-off' });
        },
        S = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'plus' });
        },
        P = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'trophy' });
        },
        A = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'angle-double-right' });
        },
        k = function (e) {
          var t = e.size,
            r = e.color;
          return a.a.createElement(l, { size: t, color: r, prefix: 'fas', iconName: 'ban' });
        };
    },
    61: function (e, t, r) {
      'use strict';
      r.d(t, 'b', function () {
        return l;
      }),
        r.d(t, 'a', function () {
          return d;
        }),
        r.d(t, 'd', function () {
          return p;
        }),
        r.d(t, 'c', function () {
          return f;
        });
      var n = r(7),
        a = r.n(n),
        c = r(14),
        o = r(4),
        s = r(22),
        u = r(27),
        i = r(17),
        l = (function () {
          var e = Object(s.a)(
            a.a.mark(function e(t) {
              var r, n, s, u;
              return a.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.tId),
                          (n = t.addEmpty),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            r ? '/api/v1/player/list/'.concat(r) : '/api/v1/player/list',
                            Object(o.a)({ method: 'GET' }, i.a)
                          )
                        );
                      case 4:
                        return (s = e.sent), (e.next = 7), s.json();
                      case 7:
                        return (
                          (u = e.sent),
                          e.abrupt('return', { results: n ? [].concat(Object(c.a)(u), [f('Nessun Giocatore')]) : u })
                        );
                      case 11:
                        return (
                          (e.prev = 11),
                          (e.t0 = e.catch(1)),
                          Object(i.c)(e.t0, 'Error players fetch'),
                          e.abrupt('return', { results: [] })
                        );
                      case 15:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 11]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        d = (function () {
          var e = Object(s.a)(
            a.a.mark(function e(t) {
              var r, n;
              return a.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.players),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/player',
                            Object(o.a)(Object(o.a)({ method: 'DELETE' }, i.a), {}, { body: JSON.stringify(r) })
                          )
                        );
                      case 4:
                        return (n = e.sent), (e.next = 7), n.json();
                      case 7:
                        return e.abrupt('return', { players: n.ok ? r : [] });
                      case 10:
                        return (
                          (e.prev = 10),
                          (e.t0 = e.catch(1)),
                          Object(i.c)(e.t0, 'Error players delete'),
                          e.abrupt('return', { players: [] })
                        );
                      case 14:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 10]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        p = (function () {
          var e = Object(s.a)(
            a.a.mark(function e(t) {
              var r, n, c;
              return a.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.player),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/player',
                            Object(o.a)(Object(o.a)({ method: 'POST' }, i.a), {}, { body: JSON.stringify(r) })
                          )
                        );
                      case 4:
                        return (n = e.sent), (e.next = 7), n.json();
                      case 7:
                        return (c = e.sent), e.abrupt('return', { player: c });
                      case 11:
                        return (
                          (e.prev = 11),
                          (e.t0 = e.catch(1)),
                          Object(i.c)(e.t0, 'Error players save'),
                          e.abrupt('return', { player: r })
                        );
                      case 15:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 11]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        f = function (e) {
          return {
            id: null,
            name: '',
            surname: '',
            alias: '',
            label: e || '',
            role: u.PlayerRole.GoalKeeper,
            email: '',
            phone: '',
            match_played: 0,
            match_won: 0,
            total_score: 0,
            editable: !1,
            rowNumber: 0,
          };
        };
    },
    68: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return n;
      });
      var n = {
        isLoading: function (e) {
          return e.sessionState.isLoading;
        },
        isAdmin: function (e) {
          return e.sessionState.isAdmin;
        },
        isAuthenticated: function (e) {
          return e.sessionState.isAuthenticated;
        },
        getUser: function (e) {
          return e.sessionState.user;
        },
        getSession: function (e) {
          return e.sessionState;
        },
      };
    },
    70: function (e, t, r) {
      'use strict';
      var n;
      r.d(t, 'a', function () {
        return n;
      }),
        (function (e) {
          (e.Success = 'success'), (e.Warning = 'warning'), (e.Danger = 'danger');
        })(n || (n = {}));
    },
    73: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return n;
      }),
        r.d(t, 'b', function () {
          return a;
        }),
        r.d(t, 'f', function () {
          return c.a;
        }),
        r.d(t, 'd', function () {
          return o;
        }),
        r.d(t, 'e', function () {
          return s;
        }),
        r.d(t, 'c', function () {
          return u.a;
        });
      var n = {
          isLoading: function (e) {
            return e.pairState.isLoading;
          },
          getPairsList: function (e) {
            return e.pairState.pairList;
          },
        },
        a = {
          isLoading: function (e) {
            return e.playerState.isLoading;
          },
          isSaving: function (e) {
            return e.playerState.isSaving;
          },
          getPlayersList: function (e) {
            return e.playerState.playersList;
          },
        },
        c = r(137),
        o = {
          isLoading: function (e) {
            return e.stage1State.isLoading;
          },
          getSelectedRows: function (e) {
            return e.stage1State.selectedRows || null;
          },
          getSelectedPairs: function (e) {
            return e.stage1State.selectedPairs;
          },
          getNeedRefresh: function (e) {
            return e.stage1State.needRefresh;
          },
          getStages: function (e) {
            return e.stage1State.stages;
          },
        },
        s = {
          isLoading: function (e) {
            return e.stage2State.isLoading;
          },
          getCells: function (e) {
            return e.stage2State.cells;
          },
          getRowsNumber: function (e) {
            return e.stage2State.rowsNumber;
          },
        },
        u = r(68);
    },
    74: function (e, t, r) {
      'use strict';
      r.r(t),
        r.d(t, 'LoadingModal', function () {
          return m;
        }),
        r.d(t, 'YesNoModal', function () {
          return v;
        }),
        r.d(t, 'GenericToast', function () {
          return h;
        }),
        r.d(t, 'RedirectionControl', function () {
          return O;
        });
      var n = r(0),
        a = r.n(n),
        c = r(66),
        o = r(58),
        s = r(269),
        u = r(178),
        i = r(139),
        l = r(104),
        d = r(135),
        p = r(270),
        f = r(24),
        b = (r(203), { color: 'whitesmoke', backgroundColor: '#343a40', borderColor: '#ffc107' }),
        g = a.a.createElement(
          a.a.Fragment,
          null,
          a.a.createElement(c.a, { animation: 'border', variant: 'light' }),
          a.a.createElement(c.a, { animation: 'border', variant: 'primary' }),
          a.a.createElement(c.a, { animation: 'border', variant: 'secondary' }),
          a.a.createElement(c.a, { animation: 'border', variant: 'success' }),
          a.a.createElement(c.a, { animation: 'border', variant: 'danger' }),
          a.a.createElement(c.a, { animation: 'border', variant: 'warning' }),
          a.a.createElement(c.a, { animation: 'border', variant: 'info' }),
          a.a.createElement(c.a, { animation: 'border', variant: 'dark' })
        ),
        m = function (e) {
          var t = e.title,
            r = void 0 === t ? 'Caricamento....' : t,
            n = e.message,
            c = void 0 === n ? 'Caricamento....' : n,
            s = e.show,
            u = void 0 === s || s,
            i = e.onHide,
            l =
              void 0 === i
                ? function () {
                    return (u = !1);
                  }
                : i;
          return a.a.createElement(
            o.a,
            { show: u, onHide: l, size: 'lg', centered: !0, style: { borderColor: '#ffc107', borderWidth: '3px' } },
            a.a.createElement(o.a.Header, { closeButton: !0, style: b }, a.a.createElement(o.a.Title, null, r)),
            a.a.createElement(o.a.Body, { className: 'text-center font-weight-bold', style: b }, c),
            a.a.createElement(o.a.Footer, { style: b }, g)
          );
        },
        v = function (e) {
          var t = e.title,
            r = e.message,
            n = e.show,
            c = e.onHide,
            d =
              void 0 === c
                ? function () {
                    return (n = !1);
                  }
                : c,
            p = e.onClick;
          return a.a.createElement(
            o.a,
            {
              className: 'YesNoModal',
              show: n,
              onHide: d,
              centered: !0,
              style: { borderColor: '#ffc107', borderWidth: '3px' },
            },
            a.a.createElement(o.a.Header, { closeButton: !0, style: b }, a.a.createElement(o.a.Title, null, t)),
            a.a.createElement(
              o.a.Body,
              { style: b },
              a.a.createElement(
                s.a,
                { fluid: !0 },
                a.a.createElement(u.a, { style: { fontSize: 'larger' } }, r),
                a.a.createElement(
                  u.a,
                  { style: { padding: '2rem 0rem 0rem 0rem' } },
                  a.a.createElement(
                    i.a,
                    null,
                    a.a.createElement(
                      l.a,
                      {
                        variant: 'outline-secondary',
                        className: 'float-left',
                        onClick: function () {
                          return d();
                        },
                      },
                      'Annulla'
                    )
                  ),
                  a.a.createElement(
                    i.a,
                    null,
                    a.a.createElement(
                      l.a,
                      {
                        variant: 'outline-success',
                        className: 'float-right',
                        onClick: function () {
                          return p();
                        },
                      },
                      'Conferma'
                    )
                  )
                )
              )
            ),
            a.a.createElement(o.a.Footer, { style: b }, g)
          );
        },
        h = function (e) {
          var t = e.message,
            r = e.type;
          return t && '' !== t
            ? a.a.createElement(
                d.a,
                { className: 'rounded mr-2 mx-auto', key: ''.concat(r, '-message'), show: '' !== t },
                a.a.createElement(
                  d.a.Header,
                  { closeButton: !1 },
                  a.a.createElement('strong', null, 'Operazione completata !')
                ),
                a.a.createElement(d.a.Body, null, a.a.createElement(p.a, { variant: r }, t))
              )
            : null;
        };
      function O(e) {
        var t = Object(f.h)();
        return a.a.createElement(
          'div',
          null,
          a.a.createElement('h1', null, 'Current Ruote : ', a.a.createElement('code', null, t.pathname))
        );
      }
    },
    96: function (e, t, r) {
      'use strict';
      r.d(t, 'c', function () {
        return i;
      }),
        r.d(t, 'a', function () {
          return l;
        }),
        r.d(t, 'b', function () {
          return d;
        });
      var n = r(14),
        a = r(4),
        c = r(7),
        o = r.n(c),
        s = r(22),
        u = r(61),
        i = function (e) {
          return {
            id: null,
            tId: 0,
            rowNumber: 0,
            player1: Object(u.c)(),
            player2: Object(u.c)(),
            alias: e || '',
            stage1Name: '',
            placement: 0,
            paid1: !1,
            paid2: !1,
          };
        };
      var l = {
          option: function (e, t) {
            return Object(a.a)(
              Object(a.a)({}, e),
              {},
              { backgroundColor: 'white', color: 'black', '&:hover': { backgroundColor: '#64bd9c', color: 'white' } }
            );
          },
          input: function (e) {
            return Object(a.a)(Object(a.a)({}, e), {}, { backgroundColor: '#64bd9c' });
          },
          control: function (e) {
            return Object(a.a)(Object(a.a)({}, e), {}, { height: '3vmin', marginBottom: 'auto' });
          },
          singleValue: function (e) {
            return Object(a.a)({}, e);
          },
          valueContainer: function (e) {
            return Object(a.a)(Object(a.a)({}, e), {}, { height: '100%', fontSize: 'larger' });
          },
        },
        d = (function () {
          var e = Object(s.a)(
            o.a.mark(function e(t) {
              var r, a, c, s;
              return o.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        fetch('/api/v1/pair/list/?tId='.concat(t), {
                          method: 'GET',
                          headers: { 'Content-Type': 'application/json' },
                        })
                      );
                    case 2:
                      return (r = e.sent), (e.next = 5), r.json();
                    case 5:
                      return (
                        (a = e.sent),
                        (e.next = 8),
                        fetch(t ? '/api/v1/player/list/'.concat(t) : '/api/v1/player/list', {
                          method: 'GET',
                          headers: { 'Content-Type': 'application/json' },
                        })
                      );
                    case 8:
                      return (r = e.sent), (e.next = 11), r.json();
                    case 11:
                      return (
                        (c = e.sent),
                        (s = [].concat(Object(n.a)(c), [Object(u.c)('Nessun Giocatore')])),
                        console.log('rows : ', a),
                        e.abrupt('return', { rows: a, players: s })
                      );
                    case 15:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })();
    },
    99: function (e, t, r) {
      'use strict';
      r.d(t, 'a', function () {
        return l;
      }),
        r.d(t, 'd', function () {
          return d;
        }),
        r.d(t, 'b', function () {
          return p;
        }),
        r.d(t, 'c', function () {
          return f;
        });
      var n = r(14),
        a = r(7),
        c = r.n(a),
        o = r(4),
        s = r(22),
        u = r(17),
        i = r(96),
        l = (function () {
          var e = Object(s.a)(
            c.a.mark(function e(t) {
              var r;
              return c.a.wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        fetch(
                          '/api/v1/stage2',
                          Object(o.a)(Object(o.a)({ method: 'DELETE' }, u.a), {}, { body: JSON.stringify({ tId: t }) })
                        )
                      );
                    case 2:
                      return (r = e.sent), (e.next = 5), r.json();
                    case 5:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        d = (function () {
          var e = Object(s.a)(
            c.a.mark(function e(t, r) {
              var n;
              return c.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.prev = 0),
                          (e.next = 3),
                          fetch(
                            '/api/v1/stage2/cells',
                            Object(o.a)(
                              Object(o.a)({ method: 'POST' }, u.a),
                              {},
                              { body: JSON.stringify({ cell1: t, cell2: r }) }
                            )
                          )
                        );
                      case 3:
                        return (n = e.sent), (e.next = 6), n.json();
                      case 6:
                        e.next = 11;
                        break;
                      case 8:
                        (e.prev = 8), (e.t0 = e.catch(0)), Object(u.c)(e.t0, 'Error stage2 update');
                      case 11:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 8]]
              );
            })
          );
          return function (t, r) {
            return e.apply(this, arguments);
          };
        })(),
        p = (function () {
          var e = Object(s.a)(
            c.a.mark(function e(t) {
              var r, a;
              return c.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.prev = 0), (e.next = 3), fetch('/api/v1/stage2/pairs/'.concat(t));
                      case 3:
                        return (r = e.sent), (e.next = 6), r.json();
                      case 6:
                        return (
                          (a = e.sent), e.abrupt('return', { pairs: [Object(i.c)('-')].concat(Object(n.a)(a.pairs)) })
                        );
                      case 10:
                        (e.prev = 10), (e.t0 = e.catch(0)), Object(u.c)(e.t0, 'Error stage2 fetching pairs');
                      case 13:
                        return e.abrupt('return', { pairs: [] });
                      case 14:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[0, 10]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })(),
        f = (function () {
          var e = Object(s.a)(
            c.a.mark(function e(t) {
              var r, n, a, s;
              return c.a.wrap(
                function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (r = t.count),
                          (n = t.tournamentId),
                          (e.prev = 1),
                          (e.next = 4),
                          fetch(
                            '/api/v1/stage2',
                            Object(o.a)(
                              Object(o.a)({ method: 'POST' }, u.a),
                              {},
                              { body: JSON.stringify({ tournamentId: n, rowsNumber: r }) }
                            )
                          )
                        );
                      case 4:
                        return (a = e.sent), (e.next = 7), a.json();
                      case 7:
                        return (s = e.sent), e.abrupt('return', { cells: s, rowsNumber: r });
                      case 11:
                        return (
                          (e.prev = 11),
                          (e.t0 = e.catch(1)),
                          Object(u.c)(e.t0, 'Error stage2 fetch'),
                          e.abrupt('return', { cells: [], rowsNumber: r })
                        );
                      case 15:
                      case 'end':
                        return e.stop();
                    }
                },
                e,
                null,
                [[1, 11]]
              );
            })
          );
          return function (t) {
            return e.apply(this, arguments);
          };
        })();
    },
  },
  [[183, 186, 188]],
]);
//# sourceMappingURL=main.aa2fe96c.chunk.js.map
