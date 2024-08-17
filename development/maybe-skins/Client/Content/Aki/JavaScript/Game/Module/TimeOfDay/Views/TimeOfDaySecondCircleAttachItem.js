"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.TimeOfDaySecondCircleAttachItem = void 0);
const UE = require("ue"),
	Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
	MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
	EventDefine_1 = require("../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../Common/Event/EventSystem"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	AutoAttachItem_1 = require("../../AutoAttach/AutoAttachItem"),
	TimeOfDayDefine_1 = require("../TimeOfDayDefine"),
	TimeOfDayModel_1 = require("../TimeOfDayModel"),
	ANIMAL_SCALE = 0.8,
	MIDDLE_TIME = 12,
	FULL_ANGLE = 360,
	ONE_HOUR_ANGLE = 30,
	LEFT_RANGE = 0.4,
	MIDDLE_RANGE = 0.5,
	RIGHT_RANGE = 0.6,
	BORDER_ALPHA = 0.8,
	BORDER_RIGHT = 0.65625,
	BORDER_LEFT = 0.34375,
	BORDER_LEFT_HIDE = 0.03125,
	BORDER_RIGHT_HIDE = 0.96875,
	BORDER_MIDDLE = 0.5,
	STONE2_BORDER_LEFT = 0.375,
	STONE2_BORDER_RIGHT = 0.625,
	NIAGARA_MIN_VALUE = 0.2;
class TimeOfDaySecondCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
	constructor() {
		super(...arguments),
			(this.osi = void 0),
			(this._it = Rotator_1.Rotator.Create()),
			(this.rsi = new UE.Vector(0.8, 0.8, 0.8)),
			(this.yTo = () => {
				void 0 !== this.osi &&
					EventSystem_1.EventSystem.Emit(
						EventDefine_1.EEventName.ClickTimeItem,
						this,
					);
			});
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIText],
			[2, UE.UIText],
			[3, UE.UIButtonComponent],
			[4, UE.UITexture],
			[5, UE.UIItem],
			[6, UE.UIItem],
			[7, UE.UIItem],
			[8, UE.UIItem],
		]),
			(this.BtnBindInfo = [
				[
					3,
					() => {
						this.yTo();
					},
				],
			]);
	}
	OnRefreshItem(t) {
		(this.osi = t),
			this.GetItem(6).SetUIActive(void 0 === t),
			this.GetItem(7).SetUIActive(void 0 !== t),
			this.$8e(),
			this.Cni(),
			this.OnMoveItem();
	}
	$8e() {
		var t;
		this.osi &&
			(this.GetText(2).SetText(this.osi.ShowName),
			(t = TimeOfDayModel_1.TodDayTime.ConvertToHourMinuteString(
				this.osi.SetTime,
			)),
			this.GetText(1).SetText(t));
	}
	Cni() {
		if (this.osi) {
			let i = this.osi.SetTime / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR;
			i > 12 && (i -= 12);
			var t = 360 - 30 * i,
				e = this.GetItem(0);
			(this._it.Yaw = t), e.SetUIRelativeRotation(this._it.ToUeRotator());
		}
	}
	OnMoveItem() {
		var t,
			e = this.GetCurrentMovePercentage(),
			i = this.RootItem.RelativeScale3D;
		let s = 0,
			o = 0,
			a = 0;
		e >= 0.34375 && e < 0.5
			? ((s = (e - 0.34375) / 0.15625),
				(o = MathUtils_1.MathUtils.Lerp(0.8, 1, s)))
			: e > 0.03125 && e < 0.34375
				? ((s = (e - 0.03125) / 0.3125),
					(o = MathUtils_1.MathUtils.Lerp(0.4, 0.8, s)))
				: e <= 0.03125 && (o = 0.4),
			e >= 0.5 && e < 0.65625
				? ((s = (e - 0.5) / 0.15625),
					(o = MathUtils_1.MathUtils.Lerp(1, 0.8, s)))
				: e >= 0.65625 && e < 0.96875
					? ((s = (e - 0.65625) / 0.3125),
						(o = MathUtils_1.MathUtils.Lerp(0.8, 0.4, s)))
					: e >= 0.96875 && (o = 0.4),
			this.GetItem(5).SetAlpha(o),
			(a =
				e > 0.375 && e < 0.5
					? ((s = (e - 0.375) / 0.125),
						(o = MathUtils_1.MathUtils.Lerp(0, 1, s)),
						-(
							TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(
								1 - s,
							) ?? 0
						))
					: e >= 0.5 && e < 0.625
						? ((s = (e - 0.5) / 0.125),
							(o = MathUtils_1.MathUtils.Lerp(1, 0, s)),
							TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(
								s,
							) ?? 0)
						: ((o = 0),
							(t =
								TimeOfDaySecondCircleAttachItem.MiddleOffsetCurve?.GetFloatValue(
									1,
								) ?? 0),
							e < 0.375 ? -t : t)),
			this.GetItem(7).SetAnchorOffsetX(a),
			this.GetItem(6).SetAnchorOffsetX(a),
			this.GetItem(8).SetAlpha(Math.max(0.2, o)),
			this.GetTexture(4).SetAlpha(o),
			e >= 0.4 && e <= 0.6
				? e >= 0.4 && e <= 0.5
					? ((s = e - 0.4),
						(t = MathUtils_1.MathUtils.Lerp(0.8, 1, 10 * s)),
						(t = new UE.Vector(t, t, t)),
						this.RootItem.SetUIItemScale(t))
					: ((s = e - 0.5),
						(t = MathUtils_1.MathUtils.Lerp(1, 0.8, 10 * s)),
						(e = new UE.Vector(t, t, t)),
						this.RootItem.SetUIItemScale(e))
				: i.X !== this.rsi.X && this.RootItem.SetUIItemScale(this.rsi);
	}
	OnUnSelect() {}
	OnSelect() {
		(ModelManager_1.ModelManager.TimeOfDayModel.CurrentSelectTimeItemSt =
			this.osi),
			EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectTimeItem);
	}
}
(exports.TimeOfDaySecondCircleAttachItem =
	TimeOfDaySecondCircleAttachItem).MiddleOffsetCurve = void 0;
