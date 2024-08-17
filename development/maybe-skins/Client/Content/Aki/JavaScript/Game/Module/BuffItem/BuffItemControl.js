"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BuffItemControl = void 0);
const Log_1 = require("../../../Core/Common/Log"),
	CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
	MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../Core/Net/Net"),
	MathUtils_1 = require("../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	TimeUtil_1 = require("../../Common/TimeUtil"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	CharacterAttributeTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	ReviveItemView_1 = require("../DeadRevive/views/ReviveItemView"),
	ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
	TRIAL_ROLE_ID = 1e4;
class BuffItemControl extends UiControllerBase_1.UiControllerBase {
	static OnInit() {
		return !0;
	}
	static OnClear() {
		return !0;
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(20093, BuffItemControl.Egt),
			Net_1.Net.Register(22628, BuffItemControl.ygt);
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(20093), Net_1.Net.UnRegister(22628);
	}
	static RequestUseBuffItem(e, t, o) {
		var r = new Protocol_1.Aki.Protocol.EQn();
		(r.G3n = e),
			(r.O3n = t),
			(r.l3n = o),
			Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("BuffItem", 8, "[Inventory]客户端请求使用Buff道具", [
					"massage",
					r,
				]),
			Net_1.Net.Call(17917, r, (e) => {
				if (e.lkn === Protocol_1.Aki.Protocol.lkn.Sys && (n = e.OSs)) {
					var o = n.G3n,
						r = MathUtils_1.MathUtils.LongToNumber(n.GSs),
						n = TimeUtil_1.TimeUtil.GetServerTime();
					Log_1.Log.CheckInfo() &&
						Log_1.Log.Info(
							"BuffItem",
							8,
							"[Inventory]服务端返回Buff道具数据",
							["endTimeStamp", r],
							["nowTimeStamp", n],
							["remainingTime", r - n],
							["massage", e],
						);
					let m =
						ConfigManager_1.ConfigManager.TextConfig.GetTextById(
							"UseBuffItemText",
						);
					(n =
						ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
							o,
						).Name),
						(n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n));
					var i =
							((m = m.replace("{0}", n)),
							ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
								m,
							),
							ModelManager_1.ModelManager.BuffItemModel),
						a =
							((n = ConfigManager_1.ConfigManager.BuffItemConfig),
							i.SetCurrentUseBuffItemId(o),
							n.GetBuffItemConfig(o));
					if (a) {
						var f = a.PublicCdGroup;
						if (f) {
							var l = n.GetBuffItemConfigByPublicCdGroup(f),
								g = n.GetBuffItemCdGroup(f);
							for (const e of l)
								i.SetBuffItemCdTimeStamp(e.Id, r, g.CoolDownTime);
						} else i.SetBuffItemCdTimeStamp(o, r, a.Cd);
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnUseBuffItem,
							o,
							r,
							t,
						);
					} else
						Log_1.Log.CheckInfo() &&
							Log_1.Log.Info(
								"BuffItem",
								8,
								"[Inventory]服务端返回Buff道具数据时，s.属性奖励表中找不到对应Buff道具",
								["massage", e],
							);
				}
			});
	}
	static InitializeAllUseBuffItemRoleFromPlayerFormationInstance(e) {
		var t = ModelManager_1.ModelManager.BuffItemModel,
			o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
		for (let l = 0; l < o.length; l++) {
			if (!((a = o[l]).GetConfigId > 1e4)) {
				var r = l + 1,
					n = a.GetConfigId,
					i = ModelManager_1.ModelManager.RoleModel.GetRoleName(n),
					a = a.EntityHandle,
					f = a?.Entity?.GetComponent(156);
				let o = 0,
					g = 0,
					m = 0;
				f &&
					((o = f.GetCurrentValue(
						CharacterAttributeTypes_1.EAttributeId.Proto_Lv,
					)),
					(g = f.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Tkn)),
					(m = f.GetCurrentValue(
						CharacterAttributeTypes_1.EAttributeId.Proto_Life,
					))),
					t.NewUseBuffItemRoleData(i, r, n, o, m, g, e, a.Entity);
			}
		}
	}
	static TryUseResurrectionItem(e) {
		var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
				"use_buff_item_id_list",
			),
			o = ModelManager_1.ModelManager.InventoryModel,
			r = ModelManager_1.ModelManager.BuffItemModel,
			n = ConfigManager_1.ConfigManager.BuffItemConfig;
		let i = !0,
			a = !0,
			f = MathUtils_1.MathUtils.MaxFloat;
		for (const m of t)
			if (!(o.GetItemCountByConfigId(m) <= 0) && n.IsResurrectionItem(m)) {
				i = !1;
				var l,
					g = r.GetBuffItemRemainCdTime(m);
				if (!(0 < g))
					return (
						(a = !1),
						(l = new ReviveItemView_1.ReviveItemData(e, t, m)),
						UiManager_1.UiManager.IsViewShow("UseReviveItemView") ||
							UiManager_1.UiManager.OpenView("UseReviveItemView", l),
						!0
					);
				g < f && (f = g);
			}
		return (
			i
				? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"NotResurrectionItem",
					)
				: a &&
					ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
						"AllResurrectionItemInCd",
						f.toFixed(0),
					),
			!1
		);
	}
}
((exports.BuffItemControl = BuffItemControl).Egt = (e) => {
	Log_1.Log.CheckInfo() &&
		Log_1.Log.Info("BuffItem", 8, "[Inventory]服务端通知Buff道具数据", [
			"massage",
			e,
		]);
	var t = e.kSs;
	if (t) {
		var o = ModelManager_1.ModelManager.BuffItemModel,
			r = ConfigManager_1.ConfigManager.BuffItemConfig;
		for (const m of t) {
			var n = m.G3n,
				i = MathUtils_1.MathUtils.LongToNumber(m.GSs),
				a = r.GetBuffItemConfig(n);
			if (a) {
				var f = a.PublicCdGroup;
				if (f) {
					var l = r.GetBuffItemConfigByPublicCdGroup(f),
						g = r.GetBuffItemCdGroup(f);
					for (const e of l) o.SetBuffItemCdTimeStamp(e.Id, i, g.CoolDownTime);
				} else o.SetBuffItemCdTimeStamp(n, i, a.Cd);
			} else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"BuffItem",
						8,
						"[Inventory]服务端通知Buff道具数据时，s.属性奖励表中找不到对应Buff道具",
						["massage", e],
					);
		}
	}
}),
	(BuffItemControl.ygt = (e) => {
		if (
			(Log_1.Log.CheckInfo() &&
				Log_1.Log.Info("BuffItem", 8, "[Inventory]服务端通知Buff道具进入CD", [
					"massage",
					e,
				]),
			e.NSs)
		) {
			var t = e.NSs.G3n,
				o = MathUtils_1.MathUtils.LongToNumber(e.NSs.GSs),
				r = ConfigManager_1.ConfigManager.BuffItemConfig,
				n = ModelManager_1.ModelManager.BuffItemModel,
				i = r.GetBuffItemConfig(t);
			if (i) {
				var a = i.PublicCdGroup;
				if (a) {
					var f = r.GetBuffItemConfigByPublicCdGroup(a),
						l = r.GetBuffItemCdGroup(a);
					for (const e of f) n.SetBuffItemCdTimeStamp(e.Id, o, l.CoolDownTime);
				} else n.SetBuffItemCdTimeStamp(t, o, i.Cd);
			} else
				Log_1.Log.CheckInfo() &&
					Log_1.Log.Info(
						"BuffItem",
						8,
						"[Inventory]服务端通知Buff道具进入CD时，s.属性奖励表中找不到对应Buff道具",
						["massage", e],
					);
		}
	});
