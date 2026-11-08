import { ArrowRightUpIcon } from '@solar-icons/react/linear/arrow-right-up';
import { AltArrowRightIcon } from '@solar-icons/react/linear/alt-arrow-right';
import { DownloadMinimalisticIcon } from '@solar-icons/react/linear/download-minimalistic';
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Patinhas | Links",
    description: "Gráficos com os resultados da pesquisa do projeto Patinhas.",
};

export default function Links() {
    
    return (
        <main className="flex flex-1 w-full max-w-5xl flex-col pb-16 mx-auto">
            <div className="mt-16 px-6">
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
                            target="_blank"
                            rel="noopener noreferrer"
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
                            target="_blank"
                            rel="noopener noreferrer"
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
                            target="_blank"
                            rel="noopener noreferrer"
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
            </div>
        </main>
    );
}