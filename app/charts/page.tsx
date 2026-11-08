import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import PieQuestion from "@/components/pie-question";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Patinhas | Gráficos",
    description: "Gráficos com os resultados da pesquisa do projeto Patinhas.",
};

export default function Charts() {
    const text = fs
        .readFileSync(path.join(process.cwd(), "db/data.csv"), "utf-8")
        .replace(/^\uFEFF/, "");
    const rows = Papa.parse<string[]>(text, { skipEmptyLines: true }).data;
    const header = rows[0];
    const body = rows.slice(1);

    const questions = header.slice(1, 21).map((title, i) => {
        const counts = new Map<string, number>();

        body.forEach((row) => {
            let answer = (row[i + 1] ?? "").trim();
            if (!answer) return;

            if (i === 3) {
                const t = answer.toLowerCase();
                if (/não possuo|tinha/.test(t)) answer = "Não possui";
                else if (
                    /calopsita|pássaro|passaro|peixe|jabuti|coelho/.test(t)
                )
                    answer = "Outros animais";
                else if (/gato|gata/.test(t) && /cachorro/.test(t))
                    answer = "Gatos e cachorros";
                else if (/gato|gata/.test(t)) answer = "Gatos";
                else if (/cachorro/.test(t)) answer = "Cachorros";
                else answer = "Outros animais";
            }

            if (i === 5) {
                if (answer.startsWith("Sim, resido em João Pessoa"))
                    answer = "João Pessoa";
                else if (answer.includes("metropolitana"))
                    answer = "Região metropolitana";
                else answer = "Outra resposta";
            }

            counts.set(answer, (counts.get(answer) ?? 0) + 1);
        });

        const scale = [
            "Concordo totalmente",
            "Concordo",
            "Neutro",
            "Discordo",
            "Discordo totalmente",
        ];

        const sorted = [...counts].sort(([nameA, valueA], [nameB, valueB]) =>
            scale.includes(nameA) && scale.includes(nameB)
                ? scale.indexOf(nameA) - scale.indexOf(nameB)
                : valueB - valueA,
        );

        const colors = [
            "#E5341D",
            "#FF7765",
            "#FFD8C0",
            "#9067F7",
            "#B1EB01",
            "#FBD95A",
        ];

        return {
            title,
            total: sorted.reduce((sum, [, value]) => sum + value, 0),
            data: sorted.map(([name, value], j) => ({
                name,
                value,
                fill: colors[j % colors.length],
            })),
        };
    });

    return (
        <main className="flex flex-1 w-full max-w-5xl flex-col pb-16 mx-auto">
            <div className="mt-16 px-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary-950 mb-2">
                    Perguntas e resultados
                </h2>
                <p className="text-primary-900 mb-8">
                    {body.length} respostas coletadas
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {questions.map((question) => (
                        <section
                            key={question.title}
                            className="flex flex-col rounded-2xl border border-primary-200 bg-primary-100 p-6"
                        >
                            <h3 className="text-base md:text-lg font-bold text-primary-950 mb-1">
                                {question.title}
                            </h3>
                            <span className="text-sm text-primary-800 mb-4">
                                {question.total} respostas
                            </span>
                            <PieQuestion data={question.data} />
                        </section>
                    ))}
                </div>

                <div className="flex flex-col md:w-md mt-8">
                    <Image
                        src="/img/mayla-2.jpg"
                        alt="Patinhas"
                        width={364}
                        height={200}
                        priority
                        className={`
                                w-full max-w-md mb-2
                                rounded-lg
                                overflow-hidden
                                border-3 border-primary-950
                            `}
                    />
                    <span className="text-sm text-primary-950">
                        Essa é Mayla agora, grande e muito feliz.
                    </span>
                </div>
            </div>
        </main>
    );
}
