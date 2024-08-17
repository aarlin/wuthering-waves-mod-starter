"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementGroupSmallItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementGroupSmallItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.Gqe = void 0),
			(this.eqe = void 0),
			(this.rqe = (e) => {
				ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
					e,
				).GetGroupId() === this.Gqe?.GetId() &&
					(this.Nqe(), this.Vbe(this.Gqe));
			}),
			(this.Fbe = (e) => {
				this.Gqe?.GetId() === e && (this.Nqe(), this.Vbe(this.Gqe));
			}),
			(this.Iqe = () => {
				this.Oqe();
			}),
			(this.kqe = () => {
				(ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup =
					this.Gqe),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnAchievementGroupChange,
					);
			});
	}
	async Init(e) {
		await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
	}
	ClearItem() {
		this.Destroy();
	}
	GetUsingItem(e) {
		return this.GetRootItem().GetOwner();
	}
	Update(e, t) {
		(this.Gqe = e), this.Pqe(e), this.Vbe(e), this.Oqe(), this.Nqe();
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[4, UE.UIItem],
			[1, UE.UIExtendToggle],
			[3, UE.UIText],
			[2, UE.UITexture],
			[5, UE.UIItem],
		]),
			(this.BtnBindInfo = [[1, this.kqe]]);
	}
	OnStart() {
		this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAchievementGroupChange,
			this.Iqe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAchievementGroupDataNotify,
				this.Fbe,
			),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
				this.rqe,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAchievementGroupChange,
			this.Iqe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAchievementGroupDataNotify,
				this.Fbe,
			),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
				this.rqe,
			);
	}
	Oqe() {
		var e;
		void 0 !== this.Gqe &&
			void 0 !== this.GetRootItem() &&
			((e =
				ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup ===
				this.Gqe
					? 1
					: 0),
			this.GetExtendToggle(1).ToggleState !== e) &&
			this.GetExtendToggle(1).SetToggleStateForce(e, !1);
	}
	Nqe() {
		var e = this.Gqe.GetAchievementGroupProgress();
		this.GetText(3).SetText(e);
	}
	Pqe(e) {
		this.GetText(0).SetText(e.GetTitle());
		var t = this.GetTexture(2);
		this.SetTextureByPath(e.GetSmallIcon(), t),
			this.GetItem(5)?.SetUIActive(0 < e.GetRewards().length);
	}
	Vbe(e) {
		this.GetItem(4).SetUIActive(e.SmallItemRedPoint());
	}
	OnBeforeDestroy() {
		this.Gqe && (this.Gqe = void 0),
			this.eqe && (this.eqe = void 0),
			this.RemoveEventListener();
	}
}
exports.AchievementGroupSmallItem = AchievementGroupSmallItem;
