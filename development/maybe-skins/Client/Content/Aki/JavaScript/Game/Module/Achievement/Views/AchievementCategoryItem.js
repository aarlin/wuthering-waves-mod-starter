"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AchievementCategoryItem = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
	AchievementController_1 = require("../AchievementController");
class AchievementCategoryItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.kbe = void 0),
			(this.Fbe = () => {
				this.Vbe();
			}),
			(this.Hbe = () => {
				this.Vbe();
			}),
			(this.jbe = () => {
				ModelManager_1.ModelManager.AchievementModel.CurrentSelectCategory =
					this.kbe;
				var e =
					ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
						this.kbe.GetId(),
					);
				0 < e.length
					? ((ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup =
							e[0]),
						AchievementController_1.AchievementController.OpenAchievementDetailView(
							this.kbe.GetId(),
							e[0].GetId(),
						))
					: (Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Achievement", 28, "分类下没有成就组"),
						(ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup =
							void 0),
						AchievementController_1.AchievementController.OpenAchievementDetailView(
							this.kbe.GetId(),
							void 0,
						));
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIButtonComponent],
			[1, UE.UITexture],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.jbe]]);
	}
	OnStart() {
		this.AddEventListener();
	}
	AddEventListener() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnAchievementDataNotify,
			this.Hbe,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.OnAchievementGroupDataNotify,
				this.Fbe,
			);
	}
	RemoveEventListener() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnAchievementDataNotify,
			this.Hbe,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.OnAchievementGroupDataNotify,
				this.Fbe,
			);
	}
	Refresh(e, t, n) {
		(this.kbe = e), this.Vbe(), this.Wbe(), this.Kbe(), this.Qbe();
	}
	Vbe() {
		this.GetItem(4).SetUIActive(
			ModelManager_1.ModelManager.AchievementModel.GetCategoryRedPointState(
				this.kbe.GetId(),
			),
		);
	}
	Wbe() {
		this.GetText(2).SetText(this.kbe.GetTitle());
	}
	Qbe() {
		this.GetText(3).SetText(this.kbe.GetAchievementCategoryProgress());
	}
	Kbe() {
		StringUtils_1.StringUtils.IsEmpty(this.kbe.GetTexture()) ||
			this.SetTextureByPath(this.kbe.GetTexture(), this.GetTexture(1));
	}
	OnBeforeDestroy() {
		this.RemoveEventListener();
	}
}
exports.AchievementCategoryItem = AchievementCategoryItem;
