import toast from "react-hot-toast";
import {utils, writeFile} from "xlsx"

export const handleExport = async(headings: string[], data: any[], title: string) => {
    if(!data.length) {
        toast.error(`Nothing here...You cannot download an empty record`, {id: "826502", duration: 4000})
        return;
    }
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, [headings]);
    utils.sheet_add_json(ws, data, {origin: "A2", skipHeader: true})
    utils.book_append_sheet(wb, ws, `${title}`)
    writeFile(wb, `${title}.xlsx`)
}