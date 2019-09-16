<div class="c-page__wrapper">
    <div class="c-page__item c-box">
        <form id="calendar3Save" action="" method="">
            <fieldset class="c-form__group">
                <label for="datepicker" class="c-label">Date:</label>
                <input id="datepicker" class="c-form__field c-input" name="date" type="date" placeholder="dd/mm/yyyy" />
            </fieldset>

            <fieldset class="c-form__group">
                <legend class="c-legend">Availability</legend>

                <label for="availability1" class="c-check">
                    <input id="availability1" class="c-check__input" name="availability" value="not-available" type="radio">
                    <span class="c-check__mark c-check__mark--1"></span>
                    <span class="c-label--check">Not available</span>
                    <i class="c-circle-color c-available-color--0"></i>
                </label>

                <label for="availability2" class="c-check">
                    <input id="availability2" class="c-check__input" name="availability" value="low-availability" type="radio">
                    <span class="c-check__mark c-check__mark--2"></span>
                    <span class="c-label--check">Low availability</span>
                    <i class="c-circle-color c-available-color--1"></i>
                </label>

                <label for="availability3" class="c-check">
                    <input id="availability3" class="c-check__input" name="availability" value="available" type="radio">
                    <span class="c-check__mark c-check__mark--3"></span>
                    <span class="c-label--check">Available</span>
                    <i class="c-circle-color c-available-color--2"></i>
                </label>
            </fieldset>

            <input type="submit" class="c-button" value="SAVE" />
        </form>
    </div>


    <div class="c-page__item c-calendar__wrapper">
        <div id="calendar3" class="c-calendar"></div>
    </div>
</div>