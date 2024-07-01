"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.AdviceExpressionItem = void 0);
const UE = require("ue"),
	ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class AdviceExpressionItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor() {
		super(...arguments),
			(this.C8e = 0),
			(this.H9e = () => {
				this.j9e(), this.W9e();
			}),
			(this.K9e = () => {
				(ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId =
					this.C8e),
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.OnClickAdviceExpression,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIExtendToggle],
			[1, UE.UIText],
			[2, UE.UITexture],
			[3, UE.UIItem],
		]),
			(this.BtnBindInfo = [[0, this.K9e]]);
	}
	OnStart() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.OnClickAdviceExpression,
			this.H9e,
		);
	}
	Refresh(e, t, s) {
		this.C8e = e.Id;
		var r = e.ExpressionTexturePath;
		ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.Texture, (e, t) => {
			this.GetRootActor()?.IsValid() && this.GetTexture(2).SetTexture(e);
		}),
			(r = e.Name);
		this.GetText(1).ShowTextNew(r), this.j9e(), this.W9e();
	}
	W9e() {
		var e = this.GetExtendToggle(0).ToggleState,
			t =
				ModelManager_1.ModelManager.AdviceModel.PreSelectExpressionId ===
				this.C8e
					? 1
					: 0;
		e !== t && this.GetExtendToggle(0).SetToggleStateForce(t, !1);
	}
	j9e() {
		var e = ModelManager_1.ModelManager.AdviceModel.CurrentExpressionId;
		this.GetItem(3).SetUIActive(e === this.C8e);
	}
	OnBeforeDestroy() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.OnClickAdviceExpression,
			this.H9e,
		);
	}
}
exports.AdviceExpressionItem = AdviceExpressionItem;
