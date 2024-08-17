"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ExitSkillView = exports.ExitSkillViewData = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
	UiManager_1 = require("../../../../Ui/UiManager"),
	LguiUtil_1 = require("../../../Util/LguiUtil"),
	ExitSkillItem_1 = require("./ExitSkillItem");
class ExitSkillViewData {
	constructor() {
		(this.e4 = void 0), (this.e4 = new Array());
	}
	AddData(e, t, i) {
		var l = new ExitSkillItem_1.ExitSkillItemData();
		(l.RoleId = e), (l.OnlineIndex = t), (l.PlayerId = i), this.e4.push(l);
	}
	GetItems() {
		return this.e4;
	}
}
exports.ExitSkillViewData = ExitSkillViewData;
class ExitSkillView extends UiViewBase_1.UiViewBase {
	constructor() {
		super(...arguments),
			(this.Pe = void 0),
			(this.P4t = void 0),
			(this.x4t = !1),
			(this.I4t = () => {
				UiManager_1.UiManager.CloseView("ExitSkillView");
			}),
			(this.w4t = (e) => {
				(ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc = e),
					(this.x4t = e),
					this.B4t(this.x4t);
				const t = this.Pe?.GetItems();
				void 0 !== t &&
					this.P4t.forEach((e, i) => {
						e.Refresh(t[i], this.x4t);
					});
			}),
			(this.d3t = () => {
				var e =
					ModelManager_1.ModelManager.EditBattleTeamModel.GetAllRoleSlotData;
				for (let s = 0; s < this.P4t.length; s++) {
					var t = this.P4t[s],
						i = e[s],
						l = i?.GetRoleData;
					i && l
						? (((i = new ExitSkillItem_1.ExitSkillItemData()).RoleId =
								l.ConfigId),
							(i.OnlineIndex = l.OnlineIndex),
							(i.PlayerId = l.PlayerId),
							t.Refresh(i, this.x4t))
						: t.Refresh(void 0, !1);
				}
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIButtonComponent],
			[6, UE.UIButtonComponent],
			[7, UE.UIText],
			[8, UE.UIExtendToggle],
			[9, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[5, this.I4t],
				[6, this.I4t],
				[8, this.w4t],
			]);
	}
	OnBeforeDestroy() {
		(this.Pe = void 0),
			this.P4t?.splice(0, this.P4t.length),
			(this.P4t = void 0);
	}
	OnAddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.d3t,
		);
	}
	OnRemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
			this.d3t,
		);
	}
	OnStart() {
		(this.Pe = this.OpenParam), (this.P4t = new Array());
		var e = [this.GetItem(2), this.GetItem(3), this.GetItem(4)],
			t = ModelManager_1.ModelManager.GameModeModel.IsMulti,
			i =
				((t =
					(this.GetItem(9).SetUIActive(t),
					(this.x4t =
						ModelManager_1.ModelManager.RoleModel.IsShowMultiSkillDesc && t),
					this.x4t ? 1 : 0)),
				this.GetExtendToggle(8).SetToggleState(t),
				this.B4t(this.x4t),
				this.Pe?.GetItems());
		for (let t = 0; t < e.length; t++) {
			var l = new ExitSkillItem_1.ExitSkillItem(e[t]);
			this.P4t.push(l),
				i && t < i.length ? l.Refresh(i[t], this.x4t) : l.Refresh(void 0, !1);
		}
	}
	B4t(e) {
		let t = "Text_EditFormationSkill_Text";
		e && (t = "Text_EditFormationSkill_online_Text"),
			(e = this.GetText(7)),
			LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
	}
}
exports.ExitSkillView = ExitSkillView;
