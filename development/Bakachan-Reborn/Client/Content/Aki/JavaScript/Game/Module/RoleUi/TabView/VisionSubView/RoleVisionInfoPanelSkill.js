"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoleVisionInfoPanelSkill = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
	VisionAttributeItemOne_1 = require("../../../Phantom/Vision/View/VisionAttributeItemOne");
class RoleVisionInfoPanelSkill extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.Jdo = void 0),
			(this.W6i = void 0),
			(this.v6i = (e) => {
				e === this.W6i?.GetIncrId() && this.zdo(this.W6i);
			}),
			(this.Ewt = this.CreateThenShowByResourceIdAsync(
				"UiItem_VisionIMainInfoB",
				e,
			));
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UITexture],
			[1, UE.UIItem],
		];
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PhantomPersonalSkillActive,
			this.v6i,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PhantomPersonalSkillActive,
			this.v6i,
		);
	}
	OnStart() {
		(this.Jdo = new VisionAttributeItemOne_1.VisionAttributeItemOne(
			this.GetItem(1),
		)),
			this.AddEventListener();
	}
	async Update(e) {
		await this.Ewt;
		let t,
			i = 0;
		e.IsTrialRole()
			? ((t = e.GetPhantomData().GetDataMap().get(0)), (i = t.GetIncrId()))
			: ((i = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
					e.GetDataId(),
				).GetIncrIdList()[0]),
				(t =
					ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
						i,
					))),
			t
				? (this.Jdo.SetActive(!0),
					this.GetTexture(0).SetUIActive(!0),
					(e = t),
					(this.W6i = e),
					this.zdo(e),
					this.Jdo.Refresh(i))
				: (this.Jdo.SetActive(!1), this.GetTexture(0).SetUIActive(!1));
	}
	zdo(e) {
		var t = e?.GetCurrentSkillId();
		(e = e?.GetIfActivePersonalSkill()),
			(t =
				ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
					t,
				)),
			(e = e ? t.BattleViewIcon : t.SpecialBattleViewIcon);
		this.SetTextureByPath(e, this.GetTexture(0), "VisionEquipmentView");
	}
	OnBeforeDestroy() {
		this.RemoveEventListener();
	}
}
exports.RoleVisionInfoPanelSkill = RoleVisionInfoPanelSkill;
