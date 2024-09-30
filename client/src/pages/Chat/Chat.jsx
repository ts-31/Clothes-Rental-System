import React, { useEffect, useState, useCallback, Suspense } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./Chat.css";
import profile from "../../assets/profile.png";
import config from "../../config";
import { useLocation } from "react-router-dom";

const ChatBox = React.lazy(() => import("./ChatBox"));

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { receiver } = location.state || {};

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/msg/getUsers`);
        const data = await response.json();
        setUsers(data);
        console.log("DATA: ", data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (receiver) {
      console.log("Receiver: ", receiver);
      setSelectedUser(receiver);
    }
  }, [receiver]);

  const handleUserClick = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  return (
    <>
      <Container fluid className="full-height">
        <Row className="h-100 no-gutters mx-3">
          <Col
            xs={12}
            md={4}
            className="d-flex align-items-stretch flex-column bg-lightblue p-0"
          >
            <div
              className="table-container rounded-top bg-light bg-gradient"
              style={{ maxHeight: "100vh", overflowY: "auto" }}
            >
              {loading ? <p>Loading users...</p> : null}
              {error ? <p>Error: {error}</p> : null}
              <Table striped bordered hover className="rounded">
                <tbody>
                  {users.map(({ id, username }) => (
                    <tr
                      key={id}
                      onClick={() => handleUserClick({ id, username })}
                      className="align-middle"
                    >
                      <td className="d-flex align-items-center py-3">
                        <img
                          src={profile}
                          alt="User"
                          className="img-fluid rounded-circle"
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight: "15px",
                          }}
                        />
                        <span
                          className="text-start"
                          style={{ fontSize: "16px" }}
                        >
                          {username}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col
            xs={12}
            md={8}
            className="d-flex align-items-stretch flex-column p-0 border rounded-2 border-black"
          >
            <Suspense fallback={<div>Loading ChatBox...</div>}>
              <ChatBox receiver={selectedUser} />
            </Suspense>
          </Col>
        </Row>
      </Container>
    </>
  );
}
