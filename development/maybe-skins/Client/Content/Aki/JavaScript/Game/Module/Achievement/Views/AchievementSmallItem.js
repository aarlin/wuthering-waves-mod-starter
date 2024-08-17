"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementSmallItem = void 0);
const UE = require("ue"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	AchievementController_1 = require("../AchievementController");
class AchievementSmallItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.iqe = void 0),
			(this.rqe = (e) => {
				e === this.iqe?.GetId() && this.Hqe(this.iqe);
			}),
			(this.nqe = () => {
				var e;
				this.iqe &&
					((e =
						ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(
							this.iqe.GetGroupId(),
						)),
					(e = ModelManager_1.ModelManager.AchievementModel.GetCategory(
						e.GetCategory(),
					)),
					AchievementController_1.AchievementController.OpenAchievementDetailView(
						e.GetId(),
						this.iqe.GetGroupId(),
						this.iqe.GetId(),
					));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIText],
			[1, UE.UITexture],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
			[6, UE.UIButtonComponent],
			[7, UE.UITextureTransitionComponent],
		]),
			(this.BtnBindInfo = [[6, this.nqe]]);
	}
	OnStart() {
		this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
			this.rqe,
		);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
			this.rqe,
		);
	}
	Refresh(e, t, i) {
		(this.iqe = e), this.Hqe(e);
	}
	Hqe(e) {
		var t = e.GetFinishState();
		this.GetText(0).SetText(e.GetTitle()),
			this.GetItem(3).SetUIActive(e.RedPoint()),
			this.GetItem(2).SetUIActive(1 === t),
			this.GetItem(4).SetUIActive(1 === t),
			this.GetItem(5).SetUIActive(2 === t),
			(e = ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(
				this.iqe.GetGroupId(),
			));
		StringUtils_1.StringUtils.IsEmpty(e.GetSmallIcon()) ||
			this.SetTextureByPath(
				e.GetSmallIcon(),
				this.GetTexture(1),
				void 0,
				() => {
					this.GetUiTextureTransitionComponent(7).SetAllStateTexture(
						this.GetTexture(1).GetTexture(),
					);
				},
			);
	}
	OnBeforeDestroy() {
		this.RemoveEventListener();
	}
}
exports.AchievementSmallItem = AchievementSmallItem;
