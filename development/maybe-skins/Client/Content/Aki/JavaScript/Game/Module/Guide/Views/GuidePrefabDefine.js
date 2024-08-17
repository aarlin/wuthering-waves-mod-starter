"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.setPrefabText = exports.predefPrefabSetting = void 0);
const UE = require("ue"),
	StringBuilder_1 = require("../../../../Core/Utils/StringBuilder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	ConcertoResponseItem_1 = require("../../BattleUi/Views/ConcertoResponseItem"),
	LguiUtil_1 = require("../../Util/LguiUtil");
function setPrefabText(e, t) {
	var r = new StringBuilder_1.StringBuilder();
	const n = [];
	let a = [];
	const i = [];
	let o = 0;
	for (let e = 0; e < t.length; ) {
		var s = t.indexOf("[", e);
		if (-1 === s) {
			r.Append(t.substring(e, t.length));
			break;
		}
		r.Append(t.substring(e, s));
		var l = t.indexOf("]", s);
		if (!(s < l)) {
			r.Append(t.substring(s + 1, t.length));
			break;
		}
		if (0 < (s = t.substring(s + 1, l).split(",")).length) {
			n.push({ PrefabKey: s[0], Args: s });
			var g = exports.predefPrefabSetting.get(s[0]);
			if (g) {
				var d = g.GetPrefabPathFunc(s);
				i.push(d.length), (a = a.concat(d)), (e = l + 1);
				for (let e = 0; e < d.length; e++)
					r.Append("<snidx="), r.Append(o), r.Append("/>"), o++;
			}
		}
	}
	LguiUtil_1.LguiUtil.LoadAndSetText(e, r.ToString(), a, (e) => {
		let t = 0;
		n.forEach((r, n, a) => {
			var o = exports.predefPrefabSetting.get(r.PrefabKey);
			o?.Callback && o.Callback(e.slice(t, t + i[n]), r.Args), (t += i[n]);
		});
	});
}
(exports.predefPrefabSetting = new Map([
	[
		"FightConcertoStateGuide",
		{
			GetPrefabPathFunc: () => {
				const e = [];
				return (
					ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
						!0,
					).forEach((t, r) => {
						e.push(
							"/Game/Aki/UI/UIResources/UiFight/Prefabs/FightConcertoState.FightConcertoState",
						);
					}),
					e
				);
			},
			Callback: (e, t) => {
				ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0).forEach(
					(t, r) => {
						if (r < e.length) {
							const n = new ConcertoResponseItem_1.ConcertoResponseItem();
							n.CreateByActorAsync(e[r]).then(() => {
								n.Refresh(
									ModelManager_1.ModelManager.BattleUiModel.GetRoleData(t.Id),
								),
									e[r]
										.GetComponentByClass(UE.UIItem.StaticClass())
										.SetUIActive(!0);
							});
						}
					},
				);
			},
		},
	],
])),
	(exports.setPrefabText = setPrefabText);
