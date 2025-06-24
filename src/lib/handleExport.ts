import { notification } from "antd";
import {utils, writeFile} from "xlsx"

export const handleExport = async (headings: string[], data: unknown[], title: string) => {
    if(!data.length) {
        notification.error({message: `Nothing here...You cannot download an empty record`, key: "826502"})
        return;
    }
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, [headings]);
    utils.sheet_add_json(ws, data, {origin: "A2", skipHeader: true})
    utils.book_append_sheet(wb, ws, `${title}`)
    writeFile(wb, `${title}.xlsx`)
}