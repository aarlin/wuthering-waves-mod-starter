"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeSkillNode = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
class RoguelikeSkillLine extends UiPanelBase_1.UiPanelBase {
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UISprite],
		];
	}
	Refresh(e, t, i) {
		e
			? this.GetSprite(4).SetColor(UE.Color.FromHex("AA9B6AFF"))
			: this.GetSprite(4).SetColor(UE.Color.FromHex("43434380")),
			this.GetItem(0).SetUIActive(0 === t),
			this.GetItem(3).SetUIActive(1 === i && 1 === t),
			this.GetItem(2).SetUIActive(1 === i && -1 === t);
	}
}
class RoguelikeSkillNode extends UiPanelBase_1.UiPanelBase {
	constructor(e, t, i) {
		super(),
			(this.Data = void 0),
			(this.PreItem = void 0),
			(this.LineComponentList = []),
			(this.GridPanelItem = void 0),
			(this.OnToggleStateChange = (e) => {
				1 === e &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.RoguelikeSelectSkill,
						this,
					);
			}),
			(this.Data = t),
			(this.PreItem = e),
			(this.GridPanelItem = i);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[9, UE.UISprite],
			[10, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
			[11, UE.UIExtendToggle],
			[12, UE.UIItem],
		];
	}
	OnStart() {
		this.GetExtendToggle(11).OnStateChange.Add(this.OnToggleStateChange),
			(this.GetExtendToggle(11).bLockStateOnSelect = !0);
	}
	Refresh(e) {
		this.Data = e || this.Data;
		const t = (e = this.RootItem.GetOwner()
				.GetAttachParentActor()
				.GetComponentByClass(UE.UIItem.StaticClass())).GetWidth(),
			i = e.GetHeight(),
			o = this.GetItem(4).GetAnchorOffsetX(),
			a = 2 * (t / 2 - o),
			n = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
				this.Data.Id,
			);
		e = n === this.Data.Consule.length;
		for (let e = 0; e < this.Data.PostId.length; e++) {
			var s =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeById(
					this.Data.PostId[e],
				);
			const n =
					ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
						s.Id,
					),
				l = s.Row - this.Data.Row;
			if (((s = this.GetOutPosItem(l)), void 0 === this.LineComponentList[e]))
				LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
					"UiItem_RoguelikeSkillLine",
					s,
				).then((s) => {
					const r = new RoguelikeSkillLine();
					var I = s.GetComponentByClass(UE.UIItem.StaticClass());
					const g =
						ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
							this.Data.Id,
						);
					0 == l ? I.SetWidth(a) : I.SetWidth(Math.sqrt(t * t + i * i) - 2 * o),
						r.CreateThenShowByActorAsync(s).then(() => {
							r.Refresh(0 < g && 0 < n, l, this.Data.Row);
						}),
						(this.LineComponentList[e] = r);
				});
			else {
				s = this.LineComponentList[e];
				const t =
					ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
						this.Data.Id,
					);
				s.Refresh(0 < t && 0 < n, l, this.Data.Row);
			}
		}
		var l =
				ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeDescConfig(
					this.Data.Describe,
				),
			r =
				ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeCurrency(
					RoguelikeDefine_1.SKILL_POINT_ID,
				) >= this.Data.Consule[n];
		this.SetSpriteByPath(l.TalentIcon, this.GetSprite(9), !1),
			ModelManager_1.ModelManager.RoguelikeModel?.SelectSkillId ===
				this.Data.Id &&
				EventSystem_1.EventSystem.Emit(
					EventDefine_1.EEventName.RoguelikeSelectSkill,
					this,
				),
			n < 0
				? (this.GetItem(6).SetUIActive(!0),
					this.GetItem(7).SetUIActive(!1),
					this.GetItem(8).SetUIActive(!1),
					this.GetItem(10).SetUIActive(!1),
					this.GetItem(12).SetUIActive(!0),
					this.GetSprite(9).SetColor(UE.Color.FromHex("808080")))
				: (0 === n
						? (this.GetItem(6).SetUIActive(!0),
							this.GetItem(7).SetUIActive(!1),
							this.GetItem(8).SetUIActive(!1),
							this.GetItem(10).SetUIActive(r))
						: (this.GetItem(6).SetUIActive(!1),
							this.GetItem(7).SetUIActive(!e),
							this.GetItem(8).SetUIActive(e),
							this.GetItem(10).SetUIActive(!e && r)),
					this.GetItem(12).SetUIActive(!1),
					this.GetSprite(9).SetColor(UE.Color.FromHex("FFFFFF")));
	}
	GetOutPosItem(e) {
		return 0 < e ? this.GetItem(5) : e < 0 ? this.GetItem(3) : this.GetItem(4);
	}
	SetToggleState(e) {
		this.GetExtendToggle(11).SetToggleState(e, !1);
	}
}
exports.RoguelikeSkillNode = RoguelikeSkillNode;
