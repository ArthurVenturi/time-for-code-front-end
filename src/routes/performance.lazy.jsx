import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import "../../public/assets/css/performance.css";
import Header from "../components/Header";
import { Star } from "./statistics.lazy";

export const Route = createLazyFileRoute("/performance")({
  component: PerformanceComponent,
});

function PerformanceComponent() {
  const keys = Object.keys(localStorage).filter((key) =>
    key.startsWith("Exer")
  );

  const defaultTodosExer = [
    [0, 2, "00:01:30"],
    [0, 1, "00:02:10"],
    [0, 3, "00:01:50"],
    [0, 2, "00:03:00"],
  ];

  const todosExer =
    keys.length === 4
      ? keys.map((key) => JSON.parse(localStorage.getItem(key)))
      : defaultTodosExer;

  const pillars = [
    { name: "Decomposição", img: "/img/ana.png", lessons: 1, total: 1, color: "#D5C2E0", },
    {
      name: "Reconhecimento de Padrões",
      img: "/img/lilu.png",
      lessons: 1,
      total: 1,
      color: "#F8DD56",
    },
    { name: "Abstração", img: "/img/soso.png", lessons: 1, total: 1, color: "#78BD77" },
    { name: "Algoritmos", img: "/img/cadu.png", lessons: 1, total: 1, color: "#C2DAD6" },
  ];

  const exercises = [
    {
      name: "Organize as Cores do Arco-Íris",
      time: todosExer[0][2],
      tries: todosExer[0][1],
      completed: true,
    },
    {
      name: "Navegar o labirinto",
      time: todosExer[1][2],
      tries: 0,
      completed: true,
    },
    {
      name: "Caça ao Tesouro",
      time: todosExer[2][2],
      tries: 0,
      completed: true,
    },
    {
      name: "Monte o Quebra-Cabeça",
      time: todosExer[3][2],
      tries: 0,
      completed: true,
    },
  ];

  const [showModal, setShowModal] = useState(false);

  const ranking = [
    { pos: 1, user: "Ana Silva", score: 950 },
    { pos: 2, user: "João Souza", score: 900 },
    { pos: 3, user: "Maria Oliveira", score: 850 },
    { pos: 4, user: "Você", score: 800 },
    { pos: 5, user: "Lucas Ferreira", score: 750 },
    { pos: 6, user: "Pedro Almeida", score: 700 },
    { pos: 7, user: "Clara Costa", score: 650 },
    { pos: 8, user: "Rafaela Lima", score: 600 },
    { pos: 9, user: "Bruno Martins", score: 550 },
    { pos: 10, user: "Gabriel Rocha", score: 500 },
  ];
  const userRow = ranking.find(r => r.user === "Você");
  const userPos = userRow ? userRow.pos : 0;

  let filledStars = 0;
  if (userPos === 1) filledStars = 3;
  else if (userPos === 2) filledStars = 2;
  else if (userPos === 3) filledStars = 1;
  else filledStars = 0;

  return (
    <>
      <Header />
      <div className="performance-layout">
        <div className="content-performance">
          <div className="pilares-section">
            {pillars.map((pillar, index) => (
              <div className="card-pilars" key={index} style={{ borderColor: pillar.color }}>
                <div className="card-info">
                  <img src={pillar.img} alt={pillar.name}></img>
                  <h2>{pillar.name}</h2>
                </div>
                <div className="card-graphic">
                  <svg>
                    <circle
                      cx={70}
                      cy={70}
                      r={60}
                      className="background-circle"
                    ></circle>
                    <circle
                      cx={70}
                      cy={70}
                      r={60}
                      className="progress-circle"
                      style={{
                        strokeDasharray: 2 * Math.PI * 60,
                        strokeDashoffset: (1 - pillar.lessons / pillar.total) * 2 * Math.PI * 60,
                        stroke: pillar.color,
                      }}
                    ></circle>
                  </svg>
                  <div className="percentage">
                    {`${((pillar.lessons / pillar.total) * 100)}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="info">
            <div className="exercises-section">
              <h2>Exercícios</h2>
              <table className="exercises-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Tempo</th>
                    <th>Tentativas</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((exercise, index) => (
                    <tr
                      key={index}
                      className={exercise.completed ? "completed" : "incomplete"}
                    >
                      <td>{exercise.name}</td>
                      <td>{exercise.time}</td>
                      <td>{exercise.tries}</td>
                      <td>
                        <span
                          className={`status-button ${exercise.completed ? "completed" : "incomplete"
                            }`}
                        >
                          {exercise.completed ? "Concluído" : "Não Concluído"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="content-performance right">
          <div
            className="performance-profile"
            style={{ color: userPos === 1 ? "#C9B037" : userPos === 2 ? "#B4B4B4" : userPos === 3 ? "#CD7F32" : "#C9B037" }}
          >
            <div
              className="profile-circle"
              style={{ color: userPos === 1 ? "#C9B037" : userPos === 2 ? "#B4B4B4" : userPos === 3 ? "#CD7F32" : "#C9B037", borderColor: userPos === 1 ? "#C9B037" : userPos === 2 ? "#B4B4B4" : userPos === 3 ? "#CD7F32" : "#C9B037" }}
            >
              <div
                className="profile-rank"
                style={{ color: userPos === 1 ? "#C9B037" : userPos === 2 ? "#B4B4B4" : userPos === 3 ? "#CD7F32" : "#C9B037" }}
              >
                {userPos ? `${userPos}º` : "--"}
              </div>
            </div>
            <div className="profile-stars">
              {Array(filledStars).fill().map((index) => (
                <Star key={index} width={"36px"} height={"36px"} color={userPos === 1 ? "#C9B037" : userPos === 2 ? "#B4B4B4" : "#CD7F32"} />
              ))}
            </div>
            <div className="profile-note">
              {userPos && userPos <= 5 ? `Você está no Top ${userPos}!` : "Continue para subir no ranking!"}
            </div>
          </div>
          <div className="ranking-table">
            <div className="ranking-header">
              <h2>Ranking</h2>
              <button
                className="pontuation-info-btn"
                onClick={() => setShowModal(true)}
              >
                <i className="pi pi-question-circle" />
              </button>
              {showModal && (
                <div className="pontuation-modal-overlay" onClick={() => setShowModal(false)}>
                  <div
                    className="pontuation-modal"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      className="pontuation-modal-close"
                      onClick={() => setShowModal(false)}
                    >
                      ×
                    </button>
                    <h3>Sistema de Pontuação</h3>
                    <ul>
                      <li><strong>+1000 pontos :</strong> Concluir todos os exercícios sem erros</li>
                      <li><strong>+900 pontos :</strong> Concluir com até 1 erro</li>
                      <li><strong>+800 pontos :</strong> Concluir com até 2 erros</li>
                      <li><strong>+1 ponto :</strong> Para cada segundo a menos no tempo total</li>
                      <li><strong>Estrelas :</strong> Top 1 (3⭐), Top 2-3 (2⭐), Top 4-5 (1⭐)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="ranking-table-scroll">
              <table className="ranking-table-inner">
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>Usuário</th>
                    <th>Pontuação</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((row) => (
                    <tr
                      key={row.pos}
                      className={row.user === "Você" ? "highlight-you" : ""}
                    >
                      <td>{row.pos}</td>
                      <td>{row.user}</td>
                      <td>{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}