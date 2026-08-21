import { forwardRef } from "react";
import type { EmployeeDocument } from "../types/employee";
// import logo from "../assets/logo-cabecalho.png";



const Template = forwardRef<HTMLDivElement, { employee: EmployeeDocument }>(({ employee }, ref) => {


    return (
        <div style={styles.page} data-pdf-root ref={ref}>

            <div className="w-200mm" style={{ width: "80mm", marginBottom: "15mm" }} />
            <div className="border border-2 border-black w-full text-center">
                {/* Linha 1 */}
                <div className="grid grid-cols-[30%_70%]">
                    <div className="border border-black font-bold text-lg ">MRO <br />SERVIÇOS</div>
                    <div className="border border-black p-2">COMPROVANTE DE RECEBIMENTO DE EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL - EPI - LEI 6514 PORT. 3214 NR 06/18 - CLT</div>
                </div>
                {/* Linha 2 */}
                <div className="">
                    <div className="border border-black font-bold text-left pb-4 pl-4">NOME: {employee.nome}</div>
                </div>
                {/* Linha 3 */}
                <div className="grid grid-cols-6">
                    <div className="border border-black col-span-1 pb-4 pl-2 font-bold">CARGO:</div>
                    <div className="border border-black col-span-2 pb-4 pl-2 font-bold text-left">{employee.cargo}</div>
                    <div className="border border-black col-span-3 pb-4 pl-2 font-bold text-left">ADMISSÃO: {employee.admissao}</div>
                </div>
                {/* Linha 4 */}
                <div className="">
                    <div className="border border-black p-2">
                        <p style={{ margin: "0 0 12px" }}>
                            Declaro que recebi da empresa contratante os treinamentos sobre o uso correto e
                            adequado dos EPI´s abaixo relacionados, de acordo com o que determina a Port.
                            3214/78 NR 06 e 18, comprometendo-me:
                        </p>

                        <ul style={{ margin: "0 0 12px", paddingLeft: "16px" }}>
                            <li style={{ marginBottom: "8px" }}>✓ Usá-los somente para a finalidade a que se destinam;</li>
                            <li style={{ marginBottom: "8px" }}>✓ Responsabilizar-me pela sua guarda e conservação;</li>
                            <li style={{ marginBottom: "8px" }}>
                                ✓ Comunicar a Administração do contrato, qualquer alteração nos EPI´s que os
                                tornem impróprios para o uso;
                            </li>
                            <li style={{ marginBottom: "8px" }}>
                                ✓ Ressarcir os custos com a reposição dos EPI´s danificados por uso negligente ou
                                extravio;
                            </li>
                            <li style={{ marginBottom: "8px" }}>
                                ✓ Devolvê-los por ocasião da substituição por desgaste natural ou o meu desligamento.
                            </li>
                        </ul>

                        <p style={{ fontWeight: 700, marginTop: "16px", marginBottom: 0 }}>
                            O NÃO CUMPRIMENTO DESTAS RECOMENDAÇÕES PODERÁ ACARRETAR AO USUÁRIO, SANÇÕES
                            DISCIPLINARES CONSTANTES NA CONSOLIDAÇÃO DAS LEIS DO TRABALHO – CLT.
                        </p>
                    </div>
                </div>
                {/* Linha 5 */}
                <div className="h-30 flex items-center justify-end pt-10">

                    <div
                        className="p-2"
                        style={{
                            width: "300px",
                            borderTop: `1px solid #000000`,
                            marginBottom: "1px",
                        }}
                    >
                        <span style={{ fontSize: "14px" }}>Assinatura do Empregado</span>
                    </div>
                </div>
                {/* Linha 6 */}
                <div className="grid grid-cols-[15%_10%_27%_13%_12%_23%]">

                    <div className="border border-black pb-4 text-center text-xs" > DATA </div>
                    <div className="border border-black pb-4 text-center text-xs" > QUAT. </div>
                    <div className="border border-black pb-4 text-center text-xs" > EQUIPAMENTO ENTREGUE </div>
                    <div className="border border-black pb-4 text-center text-xs" > TAMANHO </div>
                    <div className="border border-black pb-4 text-center text-xs" > CA </div>
                    <div className="border border-black pb-4 text-center text-xs" > ASSINATURA ITENS </div>
                </div>
                {/* Linha 7 */}
                {employee.itens.map((item, index) => (
                    <div key={index} className="grid grid-cols-[15%_10%_27%_13%_12%_23%]">
                        <div className="border border-black pb-4 text-center text-xs"> {item.data} </div>
                        <div className="border border-black pb-4 text-center text-xs"> {item.quantidade} </div>
                        <div className="border border-black pb-4 text-center text-xs"> {item.equipamento} </div>
                        <div className="border border-black pb-4 text-center text-xs"> {item.tamanho} </div>
                        <div className="border border-black pb-4 text-center text-xs"> {item.ca} </div>
                        <div className="border border-black pb-4 text-center text-xs"></div>
                    </div>
                ))}
            </div>
        </div>
    )
})




const styles: { [key: string]: React.CSSProperties } = {
    page: {
        width: "210mm",
        height: "296mm",
        overflow: "hidden",
        boxSizing: "border-box",
        padding: "18mm",
        paddingTop: "10mm",
        fontFamily: "Arial, Helvetica, sans-serif",
        backgroundColor: "#ffffff",
        color: "#000000",
        // border: "1px solid red",
        // transform: "scale(0.7)",
    },
}


export default Template;


