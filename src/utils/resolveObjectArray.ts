import { Term } from "@/interfaces/targeting";
import { isArray, isEmpty, isObject, isString, join, orderBy } from "lodash";

interface ComboListOptions {
    id?: Number | String,
    value?: String,
    header?: String | undefined,
    group?: String | undefined,
    creative_type_id?: Number | undefined
}

export function resolveList(response: any): Array<ComboListOptions> {
    const list: Array<ComboListOptions> = [];

    Object.fromEntries(
        Object.entries(response).map(([key, value]) => {
            const obj = { id: Number(key), value: String(value) }
            list.push(obj)
            return [key, value]
        })
    );

    return list;
}

export function resolveListParams(response: any, customKey: any = "id", customValue: any = "name"): Array<ComboListOptions> {
    const list: Array<ComboListOptions> = [];

    response.map((item: any) => {
        const obj = { id: item[customKey], value: String(item[customValue]) }
        if (item.width) {
            obj['width'] = item.width;
        }
        if (item.height) {
            obj['height'] = item.height;
        }

        list.push(obj)
    })

    return list;
}

export function resolveTemplates(response: any, creativeTypes: Array<any>): Array<ComboListOptions> {
    var list: Array<ComboListOptions> = [];
    var ordered: Array<ComboListOptions> = [];
    var header: String | undefined = "";

    response.map((item: any) => {
        const creativeType = getCreativeTypeByTemplateId(creativeTypes, item["creative_type_id"]) || undefined;
        const obj = { id: Number(item["id"]), value: String(item["name"]), group: String(creativeType.value), creative_type_id: Number(item["creative_type_id"]) }
        list.push(obj)
    })

    list = orderBy(list, 'group', 'asc');

    list.map(l => {
        if (l.group !== header) {
            header = l.group;
            ordered.push({ header: header })
        }
        ordered.push(l);
    })

    return ordered;
}

export function getCreativeTypeByTemplateId(creativeTypes: Array<any>, creative_template_id: Number): any {
    return creativeTypes.find(type => type.id === creative_template_id);
}

export function getError(errors: Object, index: string) {
    if (!errors.hasOwnProperty(index)) return;
    return errors[index]
}

export function prepareTargetingDataCreate(targeting: any) {

    var targeting_terms: Array<Term> = [];
    const keys = Object.keys(targeting);

    keys.forEach((key) => {
        if (key === 'app_site') {

            var t = targeting[key];

            Object.keys(t).forEach(appSiteKey => {
                const term = t[appSiteKey];
                if (!isEmpty(term.targeting_terms)) {
                    if (isArray(term.targeting_terms[0].value)) {
                        term.targeting_terms[0].value.forEach((v: any) => {
                            targeting_terms.push({
                                value: v,
                                targeting_key_id: term.targeting_terms[0].targeting_key_id,
                                targeting_predicate_id: term.targeting_terms[0].targeting_predicate_id
                            } as Term);
                        });
                    } else {
                        term.targeting_terms.forEach((targeting_term: Term) => {
                            targeting_terms.push(targeting_term);
                        });
                    }
                }
            });
        }
    });

    return targeting_terms
}
