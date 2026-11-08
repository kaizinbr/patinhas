import Image from "next/image";
import { ArrowDownIcon } from "@solar-icons/react/linear/arrow-down";
import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { AltArrowRightIcon } from '@solar-icons/react/linear/alt-arrow-right';
import { DownloadMinimalisticIcon } from '@solar-icons/react/linear/download-minimalistic';
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans">
            <main className="flex flex-1 w-full max-w-5xl flex-col items-center pb-16 sm:items-start">
                <section className="flex flex-col items-center sm:items-start px-8 min-h-[calc(100vh-80px)] justify-center">
                    <Image
                        src="/logo-cor.svg"
                        alt="Patinhas"
                        width={364}
                        height={200}
                        priority
                        className="w-72 sm:w-96 mb-16"
                    />
                    <h1 className="text-3xl md:text-5xl font-extrabold text-center text-primary-950 sm:text-left font-walsheim">
                        Patinhas: Dados de pesquisa
                    </h1>
                    <p className="mt-4 text-lg text-center sm:text-left mb-8 text-primary-950 md:w-2/3">
                        Confira os dados da pesquisa para o projeto Patinhas,
                        voltada para entender os problemas e desafios
                        enfrentados por pessoas que possuem ou desejam ter
                        animais de estimação na Grande João Pessoa.
                    </p>
                    <ArrowDownIcon
                        className="text-primary-800 hover:text-zinc-700"
                        size={24}
                    />
                </section>

                <section className="w-full px-6 flex flex-col md:flex-row md:gap-16 justify-between items-center sm:items-start">
                    <div className="flex flex-col md:w-2/3 md:text-lg">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-primary-950 mb-4">
                            O que é o Patinhas?
                        </h2>
                        <p className="text-primary-950 mb-4">
                            O Patinhas é um Trabalho de Conclusão de Curso que
                            buscou compreender os desafios enfrentados por
                            pessoas que desejam ter animais de estimação em João
                            Pessoa e região metropolitana, para desenvolver a
                            interface de um aplicativo que possa facilitar o
                            processo de adoção e cuidado com os animais.
                        </p>
                        <p className="text-primary-950 mb-4">
                            Essa pesquisa foi realizada com o objetivo de
                            entender os problemas enfrentados por pessoas que
                            possuem ou desejam ter animais de estimação, e como
                            a tecnologia pode ser utilizada para melhorar a
                            experiência de adoção e cuidado com os animais.
                        </p>
                    </div>
                    <div className="flex flex-col md:w-md">
                        <Image
                            src="/img/mayla.jpg"
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
                            Essa é Mayla, a principal colaboradora e motivadora
                            do projeto. Ela apareceu na minha vida em 2025, logo depois de começar esse projeto.
                        </span>
                    </div>
                </section>
                <section className="w-full mt-16 px-6">
                    <div className="flex flex-col md:mr-8 md:w-2/3 md:text-lg">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-primary-950 mb-4">
                            Como a pesquisa foi feita?
                        </h2>
                        <p className="text-primary-950 mb-4">
                            A pesquisa de perfil do usuário foi montada em um
                            questionário online com 20 questões pertinentes ao objetivo
                            do projeto, aberto para o público geral residente de
                            João Pessoa e região metropolitana utilizando a
                            ferramenta Google Forms. O formulário ficou aberto
                            para captação de respostas de 28/05/2025 a
                            18/06/2025.
                        </p>
                        <p className="text-primary-950 mb-4">
                            O questionário foi criado observando a escala{" "}
                            <i>Likert</i>, escala de avaliação de 5 pontos, onde
                            o usuário pôde avaliar a sua concordância com as
                            afirmações apresentadas no questionário, sendo 1 -
                            Discordo totalmente, 2 - Discordo, 3 - Neutro, 4 -
                            Concordo e 5 - Concordo totalmente.
                        </p>

                        <p className="text-primary-950 mb-4">
                            A divulgação foi feita através de redes sociais,
                            grupos de WhatsApp e Telegram, e também através de
                            contatos pessoais com pessoas que possuem ou desejam
                            ter animais de estimação.
                        </p>

                        <p className="text-primary-950 mb-4">
                            Mas essa pesquisa não foi a única que embasou o projeto, então não deixe de conferir a apresentação do projeto, que contém mais informações sobre o projeto e a pesquisa!
                        </p>
                    </div>
                </section>
                <section className="w-full mt-16 px-6">
                    <div className="flex flex-col md:mr-8 md:w-2/3 md:text-lg gap-4">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-primary-950">
                            Links
                        </h2>
                        <Link
                            href="/charts"
                            className={`
                                    text-primary-950 hover:text-primary-800 font-bold text-lg
                                    bg-primary-400 hover:bg-primary-200
                                    px-4 py-2 rounded-lg
                                    w-fit flex items-center
                                    transition-all duration-300
                                `}
                        >
                            Ver resultados
                            <AltArrowRightIcon size={24} />
                        </Link>
                        <Link
                            href="/dl/respostas.xlsx"
                            className={`
                                    text-primary-950 hover:text-primary-800 font-bold text-lg
                                    bg-primary-400 hover:bg-primary-200
                                    px-4 py-2 rounded-lg
                                    w-fit flex items-center
                                    transition-all duration-300 gap-2
                                `}
                        >
                            Baixar respostas (XLSX)
                            <DownloadMinimalisticIcon size={24} />
                        </Link>
                        <Link
                            href="/dl/respostas.csv"
                            className={`
                                    text-primary-950 hover:text-primary-800 font-bold text-lg
                                    bg-primary-400 hover:bg-primary-200
                                    px-4 py-2 rounded-lg
                                    w-fit flex items-center
                                    transition-all duration-300 gap-2
                                `}
                        >
                            Baixar respostas (CSV)
                            <DownloadMinimalisticIcon size={24} />
                        </Link>
                        <Link
                            href="#"
                            className={`
                                    text-primary-950 hover:text-primary-800 font-bold text-lg
                                    bg-primary-400 hover:bg-primary-200
                                    px-4 py-2 rounded-lg
                                    w-fit flex items-center
                                    transition-all duration-300
                                `}
                        >
                            Ver apresentação do projeto
                            <ArrowRightUpIcon size={24} />
                        </Link>
                        <Link
                            href="#"
                            className={`
                                    text-primary-950 hover:text-primary-800 font-bold text-lg
                                    bg-primary-400 hover:bg-primary-200
                                    px-4 py-2 rounded-lg
                                    w-fit flex items-center
                                    transition-all duration-300
                                `}
                        >
                            Ver publicação
                            <ArrowRightUpIcon size={24} />
                        </Link>
                        <Link
                            href="https://www.kaizin.work/prototipo"
                            className={`
                                    text-primary-950 hover:text-primary-800 font-bold text-lg
                                    bg-primary-400 hover:bg-primary-200
                                    px-4 py-2 rounded-lg
                                    w-fit flex items-center
                                    transition-all duration-300
                                `}
                        >
                            Ver protótipo do aplicativo
                            <ArrowRightUpIcon size={24} />
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
